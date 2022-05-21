import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
	width: 62,
	height: 34,
	padding: 7,
	'& .MuiSwitch-switchBase': {
		margin: 1,
		padding: 0,
		transform: 'translateX(6px)',
		'&.Mui-checked': {
			color: '#fff',
			transform: 'translateX(22px)',
			'& .MuiSwitch-thumb:before': {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					'#fff'
				)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
			},
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
			}
		}
	},
	'& .MuiSwitch-thumb': {
		backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
		width: 32,
		height: 32,
		'&:before': {
			content: "''",
			position: 'absolute',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				'#fff'
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
		}
	},
	'& .MuiSwitch-track': {
		opacity: 1,
		backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
		borderRadius: 20 / 2
	}
}));

const SettingsContainer = styled('section')({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'baseline',
	alignItems: 'center',
	paddingTop: '5%'
});

const DarkFormContainer = styled(FormGroup)({
	backgroundColor: 'black',
	borderRadius: '4px',
	padding: '5% 5%',
	display: 'flex',
	justifyContent: 'center',
	alignContent: 'center',
	border: 'rgb(18, 18, 18) solid 2px',
	color: 'white'
});

const FormContainer = styled(FormGroup)({
	backgroundColor: 'white',
	borderRadius: '4px',
	padding: '5% 5%',
	display: 'flex',
	justifyContent: 'center',
	alignContent: 'center'
});

const Header = styled('h2')(
	({ theme }) => `

	${theme.breakpoints.up('md')} {
		text-align: 'center';
	  }
	 
	  ${theme.breakpoints.down('md')} {
		font-size: '24px';
	  }
      
	  ${theme.breakpoints.down('sm')} {
		font-size: '20px';

	  }
      `
);

const FormLabel = styled(FormControlLabel)({
	display: 'flex',
	justifyContent: 'center'
});

const HomeButton = styled(Button)(
	({ theme }) => `

	${theme.breakpoints.up('md')} {
		width: 200px;
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

const Settings = ({ darkMode }) => {
	const router = useRouter();
	return (
		<SettingsContainer>
			<Header sx={{ color: darkMode.value ? '#fff' : '#000' }}>Settings</Header>
			{darkMode.value ? (
				<DarkFormContainer>
					<FormLabel
						control={
							<MaterialUISwitch
								checked={darkMode.value}
								value={darkMode.value}
								onClick={darkMode.toggle}
								sx={{ m: 1 }}
							/>
						}
						label={darkMode.value === true ? 'Dark' : 'Light'}
					/>
					<HomeButton
						sx={{ mt: 2, backgroundColor: 'transparent', border: 'rgb(18, 18, 18) solid 2px' }}
						onClick={() => {
							router.push('/');
						}}
						variant="contained"
					>
						Home
					</HomeButton>
				</DarkFormContainer>
			) : (
				<FormContainer>
					<FormLabel
						control={
							<MaterialUISwitch
								checked={darkMode.value}
								value={darkMode.value}
								onClick={darkMode.toggle}
								sx={{ m: 1 }}
							/>
						}
						label={darkMode.value === true ? 'Dark' : 'Light'}
					/>
					<HomeButton
						sx={{ mt: 2 }}
						onClick={() => {
							router.push('/');
						}}
						variant="contained"
					>
						Home
					</HomeButton>
				</FormContainer>
			)}
		</SettingsContainer>
	);
};

export default Settings;
