import { useState } from 'react';
// import { Loading } from '../../../components/Loading/Loading';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/system';
// import { useUserContext } from '../../../context/UserContext';

const ProfileContainer = styled('section')({
	paddingTop: '5%'
});

const Header = styled('h2')({
	textAlign: 'center'
});

const Form = styled('form')({
	height: '400px',
	width: '50%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '2px 4px',
	margin: '0 auto',
	backgroundColor: 'rgb(255, 255, 255)',
	borderRadius: '4px'
});

const Input = styled('input')({
	width: '400px',
	marginTop: '0.5rem',
	padding: '0.75rem 0.5rem',
	border: 'solid grey 2px',
	borderRadius: '4px',
	backgroundColor: 'transparent'
});

const ButtonContainer = styled('div')({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center'
});

const HomeButton = styled(Button)({
	width: '150px'
});

const SubmitButton = styled(Button)({
	width: '150px'
});

const Profile = () => {
	const router = useRouter();
	const [ loading, setLoading ] = useState(true);

	const [ firstname, setFirstName ] = useState('');
	const [ lastname, setLastName ] = useState('');

	const handleSubmit = (e) => e.preventDefault();

	// const { user } = useUserContext();

	// useEffect(
	// 	() => {
	// 		if (user !== null && user !== undefined) {
	// 			setLoading(false);
	// 		}
	// 	},
	// 	[ user ]
	// );

	return (
		<ProfileContainer>
			<Form onSubmit={(e) => handleSubmit()}>
				<Header>Profile</Header>
				<Input
					placeholder="First Name.."
					type="text"
					value={firstname}
					onChange={(e) => setFirstName(e.target.value)}
				/>

				<Input
					placeholder="Last Name.."
					type="text"
					value={lastname}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
					<ButtonContainer>
						<HomeButton
							sx={{ marginTop: '2rem' }}
							onClick={() => {
								router.push('/');
							}}
							variant="contained"
						>
							Home
						</HomeButton>
					</ButtonContainer>
					<ButtonContainer>
						<SubmitButton sx={{ marginTop: '2rem' }} type="submit" variant="contained">
							Submit
						</SubmitButton>
					</ButtonContainer>
				</Stack>
			</Form>
		</ProfileContainer>
	);
};

export default Profile;
