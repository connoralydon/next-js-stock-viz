import { borderColor, styled } from '@mui/system';

export const StockContainer = ({ posNeg, children }) => {
    if (posNeg === 'pos') {
        return <StockWrapperPos>{children}</StockWrapperPos>;
    }
    else if (posNeg === 'neg') {
        return <StockWrapperNeg>{children}</StockWrapperNeg>;
    }
    else {
        return <StockWrapperNeutral>{children}</StockWrapperNeutral>;
    }
};

const StockWrapperNeutral = styled('section')({
	backgroundColor: '#E0E0E0',
	maxWidth: '25rem',
	textAlign: 'center',
	zIndex: 1,
	border: '10px solid black',
	borderRadius: '20px',
    borderColor: 'gray'

    //style an img in this section
    
});
// zero or positive
const StockWrapperPos = styled('section')({
	backgroundColor: '#CCFFCC',
	maxWidth: '25rem',
	textAlign: 'center',
	zIndex: 1,
	border: '10px solid black',
	borderRadius: '20px',
    borderColor: 'green'
});

// negative
const StockWrapperNeg = styled('section')({
	backgroundColor: '#FFCCCC',
	maxWidth: '25rem',
	textAlign: 'center',
	zIndex: 1,
	border: '10px solid black',
	borderRadius: '20px',
    borderColor: 'red'
});


export const StockPageContainer = ({ children }) => {
	return <StockPageWrapper>{children}</StockPageWrapper>;
};

const StockPageWrapper = styled('section')({
	backgroundColor: 'rgba(0,0,0,0)',
	maxWidth: '25rem',
	textAlign: 'center',
    // justifyContent: 'center',
    // display: 'flex',
    // direction: 'column',
});