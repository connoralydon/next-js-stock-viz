import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const NotFound = () => {
	return (
		<Wrapper>
			<section>
				<Header>Oops page not found.. (404 error)</Header>
				<Message>
					Enjoy this Corgi!! {' '}
					<ButtonWrapper variant="contained">
						<Link href="/">
							<LinkTag>Home</LinkTag>
						</Link>
					</ButtonWrapper>
				</Message>
			</section>
			<Image src={'/images/corgi.jpeg'} alt="corgi" width={600} height={315} />
		</Wrapper>
	);
};

const Wrapper = styled('div')({
	height: '100%',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center'
});

const Header = styled('h1')({
	textAlign: 'center'
});

const Message = styled('h3')({
	textAlign: 'center'
});

const ButtonWrapper = styled(Button)({
	justifySelf: 'center'
});

const LinkTag = styled('a')({
	textDecoration: 'none',
	color: 'inherit'
});

export default NotFound;
