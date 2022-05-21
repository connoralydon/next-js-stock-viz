import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/system';
import { getUserById, setNamesByEmail } from '../../../lib/supabase';

const ProfileContainer = styled('section')({
	paddingTop: '5%'
});

const Header = styled('h2')({
	textAlign: 'center'
});

const Form = styled('form')({
	height: '100%',
	width: '80%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '2.5% 4px',
	margin: '0 auto',
	backgroundColor: 'rgb(255, 255, 255)',
	borderRadius: '4px'
});

const DarkForm = styled('form')({
	height: '100%',
	width: '80%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '2.5% 4px',
	margin: '0 auto',
	backgroundColor: 'transparent',
	border: 'rgb(18, 18, 18) solid 2px',
	borderRadius: '4px',
	color: '#fff !important'
});

const Input = styled('input')({
	width: '90%',
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

const HomeButton = styled(Button)(
	({ theme }) => `

	${theme.breakpoints.up('md')} {
		width: 150px;
		font-size: 16px;
	  }
	 
	  ${theme.breakpoints.down('md')} {
		width: '50px';
		font-size: '12px';
	  }
      
	  ${theme.breakpoints.down('sm')} {
		width: '50px';
		font-size: '12px';
	  }
      `
);

const SubmitButton = styled(Button)(
	({ theme }) => ` 
	${theme.breakpoints.up('md')} {
		width: 150px;
		font-size: 16px;
	  }
	${theme.breakpoints.down('md')} {
		width: '50px';
		font-size: '12px';
	  }
      
	  ${theme.breakpoints.down('sm')} {
		width: '50px';
		font-size: '12px';
	  }
      `
);

export async function getServerSideProps(context) {
	const { params } = context;
	const { id } = params;
	const user = await getUserById(id);
	return {
		props: {
			user
		}
	};
}

const Profile = ({ user, chosenTheme, darkMode }) => {
	const router = useRouter();
	const [ firstname, setFirstName ] = useState('');
	const [ lastname, setLastName ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const handleSubmit = (e, email, first_name, last_name) => {
		e.preventDefault();

		setLoading(true);

		const res = setNamesByEmail(email, first_name, last_name);
		if (res) {
			setLoading(false);
			router.replace('/');
		}
	};

	return (
		<ProfileContainer>
			{darkMode.value ? (
				<DarkForm onSubmit={(e) => handleSubmit(e, user.email, firstname, lastname)}>
					<Header>Profile</Header>
					<Input
						placeholder={user.first_name}
						type="text"
						value={firstname}
						sx={{
							color: 'white'
						}}
						onChange={(e) => setFirstName(e.target.value)}
					/>

					<Input
						placeholder={user.last_name}
						type="text"
						value={lastname}
						sx={{
							color: 'white'
						}}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<Stack
						direction="row"
						spacing={2}
						divider={<Divider orientation="vertical" flexItem />}
						sx={{
							marginTop: '0.5rem',
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<ButtonContainer>
							<HomeButton
								sx={{
									marginTop: '2rem',
									backgroundColor: 'transparent',
									border: 'rgb(18, 18, 18) solid 2px'
								}}
								onClick={() => {
									router.push('/');
								}}
								variant="contained"
							>
								Home
							</HomeButton>
						</ButtonContainer>
						<ButtonContainer>
							<SubmitButton
								sx={{
									marginTop: '2rem',
									backgroundColor: 'transparent',
									border: 'rgb(18, 18, 18) solid 2px',
									color: '#fff'
								}}
								type="submit"
								variant="contained"
								disabled={firstname === '' || lastname === ''}
							>
								Submit
							</SubmitButton>
						</ButtonContainer>
					</Stack>
				</DarkForm>
			) : (
				<Form onSubmit={(e) => handleSubmit(e, user.email, firstname, lastname)}>
					<Header>Profile</Header>
					<Input
						placeholder={user.first_name}
						type="text"
						value={firstname}
						onChange={(e) => setFirstName(e.target.value)}
					/>

					<Input
						placeholder={user.last_name}
						type="text"
						value={lastname}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<Stack
						direction="row"
						spacing={2}
						divider={<Divider orientation="vertical" flexItem />}
						sx={{
							marginTop: '0.5rem',
							display: 'flex',
							alignItems: 'center'
						}}
					>
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
							<SubmitButton
								sx={{ marginTop: '2rem' }}
								type="submit"
								variant="contained"
								disabled={firstname === '' || lastname === ''}
							>
								Submit
							</SubmitButton>
						</ButtonContainer>
					</Stack>
				</Form>
			)}
		</ProfileContainer>
	);
};

export default Profile;
