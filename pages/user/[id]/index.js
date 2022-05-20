import { getAllUserIds, getUserById, setNamesByEmail } from '../../../lib/supabase';
import { useRouter } from 'next/router';
import { NavBar } from '../../../components/NavBar/NavBar';
import { Container } from '../../../components/Container/container';
import { Loading } from '../../../components/Loading/Loading';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { Fragment, useEffect, useState } from 'react';
import { Search } from '../../../components/Search/Search';
import { useStocksContext } from '../../../context/StocksContext';
import Link from 'next/link';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
export async function getStaticProps({ params }) {
	const { id } = params;
	const user = await getUserById(id);
	console.log(user);
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

const Form = styled('form')({
	width: '80%',
	margin: '0 auto',
	paddingTop: '5%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center'
});

const InputField = styled(TextField)({
	width: '80%',
	margin: '1rem auto',
	padding: '0.5rem 1rem',
	borderRadius: '4px'
});

const FormPage = ({ handleSubmit, email }) => {
	const [ firstname, setFirstName ] = useState('');
	const handleFirstNameChange = (e) => setFirstName(e.target.value);

	const [ lastname, setLastName ] = useState('');
	const handleLastNameChange = (e) => setLastName(e.target.value);

	return (
		<Container>
			<Form onSubmit={(e) => handleSubmit(e, email, firstname, lastname)}>
				<InputField
					key="first-name-key"
					variant="outlined"
					value={firstname}
					label={'First name..'}
					name="firstname"
					onChange={handleFirstNameChange}
				/>
				<InputField
					key="last-name-key"
					variant="outlined"
					value={lastname}
					label={'Last name..'}
					name="lastname"
					onChange={handleLastNameChange}
				/>
				<Button variant="contained" type="submit" disabled={firstname === '' || lastname === ''}>
					Submit
				</Button>
			</Form>
		</Container>
	);
};

const QueryResults = styled(Stack)({
	height: '100%',
	width: '80%',
	margin: '0 auto',
	display: 'flex',
	justifyContent: 'center',
	flexWrap: 'wrap'
});

const StockItem = styled('div')({
	// width: '200px',
	flex: '33%',
	marginTop: '0.5rem'
});

const Dashboard = ({ user }) => {
	const router = useRouter();

	const [ loading, setLoading ] = useState(true);

	const { first_name, last_name } = user;

	const [ data, setData ] = useState([]);
	const [ error, setErrorStatus ] = useState(false);
	const [ errorMsg, setErrorMsg ] = useState('');

	const { stocks, fetchStocks } = useStocksContext();

	const handleSubmit = (e, email, firstname, lastname) => {
		e.preventDefault();
		setLoading(true);
		const res = setNamesByEmail(email, firstname, lastname);
		if (res) {
			setLoading(true);
			const userDashboardURL = `/user/${encodeURIComponent(user.id)}`;
			router.push(userDashboardURL);
			// @ts-ignore
			return <Dashboard user={user} />;
		}
	};

	useEffect(
		() => {
			fetchStocks();
			if (stocks.length !== 0) {
				console.log(stocks);
				setLoading(false);
			}
		},
		[ fetchStocks ]
	);

	useEffect(
		() => {
			if (user !== null && user !== undefined) {
				setLoading(false);
			}
		},
		[ user ]
	);

	if (first_name === null || last_name === null || first_name === undefined || last_name === undefined) {
		return user.hasOwnProperty('first_name') === false ? (
			<Loading />
		) : (
			<FormPage handleSubmit={handleSubmit} email={user.email} />
		);
	}

	return (
		<Container>
			{loading ? (
				<Loading />
			) : (
				<Fragment>
					<NavBar abbr={first_name[0]} />
					<Header>
						<h1 className="text-white text-6xl font-black">Stock App</h1>
						Welcome {first_name} {last_name}!
					</Header>
					<section>
						<Search
							setLoading={setLoading}
							setData={setData}
							setErrorStatus={setErrorStatus}
							setErrorMsg={setErrorMsg}
						/>
						<QueryResults direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
							{data.length !== 0 &&
								data.map(({ symbol }, index) => (
									<StockItem key={symbol + ' ' + String(index)}>
										<Link href={`/stock/${encodeURIComponent(symbol)}`}>
											<ListItemButton>
												<ListItemText>
													<a>{symbol}</a>
												</ListItemText>
												<ListItemIcon>
													<StackedBarChartIcon />
												</ListItemIcon>
											</ListItemButton>
										</Link>
									</StockItem>
								))}
							<Divider />
							{error !== false && errorMsg}
						</QueryResults>
					</section>
				</Fragment>
			)}
		</Container>
	);
};

const Header = styled('h1')({
	textAlign: 'center'
});

export default Dashboard;
