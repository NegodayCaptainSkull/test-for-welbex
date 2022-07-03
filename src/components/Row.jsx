import React, {useState} from "react";
import '../styles/row.css'


const Row = (props) => {

  const [row, setRow] = useState({...props.row})

  const input = (event, colIdx) => {
    setRow({...row, [colIdx]: event.target.value})
    props.input(event, props.row.id - 1, colIdx)
  }

  return (
    <div className="row">
      <input
        className="column"
        onInput={e => {input(e, 'firstCol')}}
        value={row.firstCol}
        disabled={props.row.disable}
        ></input>
      <input
        className="column"
        onInput={e => {input(e, 'secondCol')}}
        value={row.secondCol}
        disabled={props.row.disable}
        ></input>
      <input
       className="column"
        onInput={e => {input(e, 'thirdCol')}}
        value={row.thirdCol}
        disabled={props.row.disable}
        ></input>
      <input
        className="column"
        onInput={e => {input(e, 'fourthCol')}}
        value={row.fourthCol}
        disabled={props.row.disable}
        ></input>
    </div>
  )
}

export default Row
