import { getAllUserIds, getUserById, setNamesByEmail } from '../../lib/supabase';
import { useRouter } from 'next/router';
import { NavBar } from '../../components/NavBar/NavBar';
import { Container } from '../../components/Container/container';
import { Loading } from '../../components/Loading/Loading';
import Button from '@mui/material/Button';
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
	const router = useRouter();

	const [ loading, setLoading ] = useState(true);

	const { id, email, first_name, last_name } = user;

	const [ firstname, setFirstName ] = useState('');
	const handleFirstNameChange = (e) => setFirstName(e.target.value);

	const [ lastname, setLastName ] = useState('');
	const handleLastNameChange = (e) => setLastName(e.target.value);

	const handleSubmit = (e) => {
		setLoading(true);
		e.preventDefault();
		console.log(firstname, lastname, id);
		const res = setNamesByEmail(email, firstname, lastname);
		if (res) {
			setLoading(false);
			const userDashboardURL = `/user/${encodeURIComponent(user.id)}`;
			router.push(userDashboardURL);
			return <Dashboard user={user} />;
		}
	};

	useEffect(
		() => {
			if (user !== null && user !== undefined && first_name !== undefined && last_name !== undefined) {
				setLoading(false);
			}
		},
		[ user, first_name, last_name ]
	);

	if (!first_name || !last_name) {
		return (
			<Container>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input
						value={firstname}
						placeholder={'First name..'}
						name="firstname"
						onChange={(e) => handleFirstNameChange(e)}
					/>
					<input
						value={lastname}
						placeholder={'Last name..'}
						name="lastname"
						onChange={(e) => handleLastNameChange(e)}
					/>
					<Button variant="contained" type="submit" disabled={firstname === '' || lastname === ''}>
						Submit
					</Button>
				</form>
			</Container>
		);
	}

	return (
		<Container>
			{loading ? (
				<Loading />
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
