function Block(props) {
  console.log(props.driver)
  return (
    <div className="d-flex flex-column justify-content-center w-25 p-1 m-1 border border-dark rounded m-5">
      <div className="m-1 p-1">Name : {props.driver.firstname  }</div>
      <div className="m-1 p-1">DOB : {props.driver.DOB} </div>
      <div className="m-1 p-1">License number : {props.driver.license}</div>
      <div className="m-1 p-1">Email : {props.driver.email}</div>
      <div className="m-1 p-1">License expiry : {props.driver.expiry} </div>
      <button className="float-right btn btn-primary p-1 m-1 w-25 rounded">edit</button>
    </div>
  );
}

export default Block;
