import { parseCookies } from "utils/cookies";
import { API_URL } from "config";
import { whitespace } from "utils/whitespace";
import Layout from "components/Layout";
import InnerBlogLayout from "components/Blog/InnerBlogLayout";
import BlogPostsList from "components/Blog/BlogPostsList";

const Cari = ({ sideMenu, blogPosts, sortBy, q = "" }) => {
	return (
		<Layout
			background="#171b2d"
			title={`Cari Blog | Unbelievable.id`}
			description={`${
				blogPosts.length &&
				`Terdapat ${blogPosts.length} artikel dari hasil pencarian${
					q ? ` "${q}".` : `.`
				}`
			} Cari artikel-artikel untuk kamu dari Unbelievable. Keputusan yang telah kamu ambil hari ini akan membuat diri kamu lebih lebih baik lagi ke depannya!`}
			keywords={
				"blog, unbelievable, unbelievable.id blog, self-improvement indonesia, kelas unbelievable indonesia, blog bahasa indonesia"
			}
		>
			<InnerBlogLayout sideMenu={sideMenu}>
				<BlogPostsList
					currentURL={`/blog-cari?q=${q}`}
					blogPosts={blogPosts}
					pageTitle={"Pencarian"}
					subtitle={`Hasil dari pencarian ${q && `"${q}"`}`}
					sortBy={sortBy}
					paramSeparator={`&`}
				/>
			</InnerBlogLayout>
		</Layout>
	);
};

export default Cari;

export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx.req);
	const sortMap = {
		terbaru: "created_at",
		terbaik: "views",
		trending: "/trending-blog-posts",
	};

	let { sortBy, q } = ctx.query;

	q = q ? q : "";

	if (!sortBy || !(sortBy.toLowerCase() in sortMap)) sortBy = "trending";

	let sort =
		sortBy.toLowerCase() !== "trending" && sortMap[sortBy.toLowerCase()];

	let res;

	if (sortBy && sortBy.toLowerCase() === "trending") {
		if (!whitespace(q)) {
			res = await fetch(`${API_URL}${sortMap["trending"]}?_q=${q}`, {
				method: "GET",
			});
		} else {
			res = await fetch(`${API_URL}${sortMap["trending"]}`, {
				method: "GET",
			});
		}
	} else {
		if (!whitespace(q)) {
			res = await fetch(`${API_URL}/blog-posts?_q=${q}&_sort=${sort}:desc`, {
				method: "GET",
			});
		} else {
			res = await fetch(`${API_URL}/blog-posts?_sort=${sort}:desc`, {
				method: "GET",
			});
		}
	}

	const blogPosts = await res.json();

	//embed: https://www.youtube.com/embed/videoseries?list=UUDrG2_1TcVkXKXXsD6Kjwig&controls=0
	if (!res.ok) {
		return {
			redirect: {
				permanent: false,
				destination: "/404",
			},
			props: {},
		};
	}

	const sideMenuResHeaders = token
		? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
		: { "Content-Type": "application/json" };
	const sideMenuRes = await fetch(
		`${API_URL}/blog-posts/side-menu-items?currentTopics=`,
		{
			method: "GET",
			headers: sideMenuResHeaders,
		}
	);

	const sideMenu = await sideMenuRes.json();
	if (sideMenuRes.ok) {
		return {
			props: {
				sortBy: !sortBy || !(sortBy in sortMap) ? "terbaru" : sortBy,
				blogPosts,
				sideMenu,
				q,
			},
		};
	}

	return {
		props: {
			blogPosts,
			sideMenu: null,
			sortBy: "",
			q,
		},
	};
}
