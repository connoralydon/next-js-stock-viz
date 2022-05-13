import { getAllUserIds, getUserById } from '../../lib/supabase';

export async function getStaticProps({ params }) {
	const { id } = params;
	let user = await getUserById(id);
	return {
		props: {
			user
		}
	};
}

export async function getStaticPaths({ params }) {
	const { ids } = await getAllUserIds();
	const paths = ids;
	return {
		paths,
		fallback: false
	};
}

const Dashboard = ({ user }) => {
	const { id, email } = user;
	console.log(user);
	return (
		<section>
			<h1>Hello {email}!</h1>
		</section>
	);
};

export default Dashboard;
