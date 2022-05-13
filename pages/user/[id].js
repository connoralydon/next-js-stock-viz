import { getAllUserIds, getUserById } from '../../lib/supabase';
import { NavBar } from '../../components/NavBar/NavBar';
import { Container } from '../../components/Container/container';
import { Fragment, useEffect, useState } from 'react';
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
	const [ loading, setLoading ] = useState(true);
	const { id, email, first_name, last_name } = user;

	useEffect(
		() => {
			if (user !== null && user !== undefined && first_name !== undefined && last_name !== undefined) {
				setLoading(false);
			}
		},
		[ user, first_name, last_name ]
	);

	return (
		<Container>
			{loading ? (
				<h1>Loading..</h1>
			) : (
				<Fragment>
					<NavBar abbr={first_name[0]} />
					<h1>
						Welcome {first_name} {last_name}!
					</h1>
				</Fragment>
			)}
		</Container>
	);
};

export default Dashboard;
