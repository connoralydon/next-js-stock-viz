import { styled } from '@mui/system';
export const Container = ({ children }) => {
	return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled('main')({
	height: '100%',
	width: '100%'
});
