import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/system';
export const Loading = () => {
	return (
		<LoadingOverlay>
			<LoadingWrapper>
				<Header>Loading..</Header>
				<LoadingBar />
			</LoadingWrapper>
		</LoadingOverlay>
	);
};

const LoadingOverlay = styled('section')({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100vh',
	position: 'absolute',
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	backgroundColor: 'rgba(0, 0, 0, .5)',
	opacity: 1,
	textAlign: 'center',
	zIndex: 1
});

const LoadingWrapper = styled('div')({
	height: '100%',
	width: '80%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-start',
	textAlign: 'center'
});

const Header = styled('h1')({
	color: 'rgb(46, 125, 50)'
});

const LoadingBar = styled(LinearProgress)({
	padding: '1rem 2rem',
	backgroundColor: '#fff',
	borderRadius: '3px',
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 100
});
