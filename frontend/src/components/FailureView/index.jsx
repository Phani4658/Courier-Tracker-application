import './index.css'

// eslint-disable-next-line react/prop-types
function FailureView({getCouriersList}) {
  return (
    <div className='failure-view'>
        <img src="https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527139.jpg?w=826&t=st=1708588506~exp=1708589106~hmac=a764b97d92cbbb5cd8a93c6a5bfc3e1095b862a6c1a9fe50b628b30514d20c22" alt="failure-image" />
        <p>Error Loading Page....</p>
        <button onClick={getCouriersList}>Try Again</button>
    </div>
  )
}

export default FailureView