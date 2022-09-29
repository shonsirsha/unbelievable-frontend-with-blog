import { API_URL } from "config";
import { parseCookies } from "utils/cookies";
import BlogPostsList from "components/Blog/BlogPostsList";
import Layout from "components/Layout";
import InnerBlogLayout from "components/Blog/InnerBlogLayout";

const BlogTopic = ({
	blogPosts = [],
	topicName = "",
	sideMenu,
	topicId = "",
	sortBy = "terbaru",
}) => {
	return (
		<Layout
			background="#171b2d"
			title={`${topicName} | Unbelievable.id`}
			description={`Artikel-artikel tentang ${topicName} untuk kamu dari Unbelievable. Keputusan yang telah kamu ambil hari ini akan membuat diri kamu lebih lebih baik lagi ke depannya!`}
			keywords={
				"blog, unbelievable, unbelievable.id blog, self-improvement indonesia, kelas unbelievable indonesia, blog bahasa indonesia"
			}
		>
			<InnerBlogLayout sideMenu={sideMenu}>
				<BlogPostsList
					currentURL={`/blog-topik/${topicId}`}
					blogPosts={blogPosts}
					pageTitle={topicName}
					sortBy={sortBy}
				/>
			</InnerBlogLayout>
		</Layout>
	);
};

export default BlogTopic;

export async function getServerSideProps(ctx) {
	const { token } = parseCookies(ctx.req);
	const sortMap = {
		terbaru: "created_at",
		terbaik: "views",
		trending: "/trending-blog-posts?_blogTopics.topicId",
	};

	let { sortBy, topicId } = ctx.query;

	if (!sortBy || !(sortBy.toLowerCase() in sortMap)) sortBy = "trending";

	let sort =
		sortBy.toLowerCase() !== "trending" && sortMap[sortBy.toLowerCase()];

	let res;

	if (sortBy && sortBy.toLowerCase() === "trending") {
		res = await fetch(`${API_URL}${sortMap["trending"]}=${topicId}`, {
			method: "GET",
		});
	} else {
		res = await fetch(
			`${API_URL}/blog-posts?_blogTopics.topicId=${topicId}&_sort=${sort}:desc`,
			{
				method: "GET",
			}
		);
	}

	const resTopic = await fetch(`${API_URL}/blog-topics?topicId=${topicId}`, {
		method: "GET",
	});

	const blogPosts = await res.json();
	const topic = await resTopic.json(); // just to get the TopicName

	//embed: https://www.youtube.com/embed/videoseries?list=UUDrG2_1TcVkXKXXsD6Kjwig&controls=0

	if (!res.ok || !resTopic.ok) {
		return {
			redirect: {
				permanent: false,
				destination: "/404",
			},
			props: {},
		};
	}

	const topicName = topic[0] ? topic[0].topicName : topicId;

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
				topicId,
				blogPosts,
				sideMenu,
				topicName,
			},
		};
	}

	return {
		props: {
			blogPosts,
			sideMenu: null,
			topicName: "",
			topicId: "",
			sortBy: "",
		},
	};
}
