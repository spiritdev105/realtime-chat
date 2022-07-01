import ReactLoading from 'react-loading';

export default function Loader({ customCss }) {
    return (
        <div className={`${customCss && customCss} flex justify-center mt-2`}>
            <ReactLoading type={'bubbles'} color={'#0da2ff'} height={25} width={40} />
        </div>
    )
}