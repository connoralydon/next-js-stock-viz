import { borderColor, styled } from '@mui/system';

export const StockContainer = ({ posNeg, children }) => {
	if (posNeg > 0) {
		return <StockWrapperPos>{children}</StockWrapperPos>;
	}
	else if (posNeg < 0) {
		return <StockWrapperNeg>{children}</StockWrapperNeg>;
	}
	else {
		return <StockWrapperNeutral>{children}</StockWrapperNeutral>;
	}
};

const StockWrapperNeutral = styled('section')({
	backgroundColor: '#E0E0E0',
	maxWidth: '25rem',
	// textAlign: 'center',
	zIndex: 1,
	border: '10px solid black',
	borderRadius: '20px',
	borderColor: 'gray',
	paddingLeft: '10px',
	paddingRight: '10px',
	paddingBottom: '10px',

	//style an img in this section
});
// zero or positive
const StockWrapperPos = styled('section')({
	backgroundColor: '#CCFFCC',
	maxWidth: '25rem',
	// textAlign: 'center',
	zIndex: 1,
	border: '10px solid black',
	borderRadius: '20px',
	borderColor: 'green',
	paddingLeft: '10px',
	paddingRight: '10px',
	paddingBottom: '10px',
});

// negative
const StockWrapperNeg = styled('section')({
	backgroundColor: '#FFCCCC',
	maxWidth: '25rem',
	// textAlign: 'center',
	zIndex: 1,
	border: '10px solid black',
	borderRadius: '20px',
	borderColor: 'red',
	paddingLeft: '10px',
	paddingRight: '10px',
	paddingBottom: '10px',
});

export const StockPageContainer = ({ children }) => {
	return <StockPageWrapper>{children}</StockPageWrapper>;
};

const StockPageWrapper = styled('section')({
	backgroundColor: 'rgba(0,0,0,0)',
	textAlign: 'center',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
});
