import React, {useState} from 'react'
import '../styles/modal.css'

const Modal = ({close, setFilter}) => {

  const [colFilter, setColFilter] = useState('secondCol')
  const [conditionFilter, setConditionFilter] = useState('equal')
  const [searchValue, setSearchValue] = useState('')

  const changeColFilter = (event) => {
    setColFilter(event.target.value)
  }

  const changeConditionFilter = event => {
    setConditionFilter(event.target.value)
  }

  const changeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div>
      <div className="modal-backdrop" onClick={close}></div>
      <div className="modal">
        <h3 className='modal-title'>Фильтр</h3>
        <form className='modal-form'>
          <select onChange={changeColFilter} className="form-chose">
            <option value="secondCol">Название</option>
            <option value="thirdCol">Количество</option>
            <option value="fourthCol">Расстояние</option>
          </select>
          <select onChange={changeConditionFilter} className="form-chose">
            <option value="equal">Равно</option>
            <option value="include">Содержит</option>
            <option value="more">Больше</option>
            <option value="less">Меньше</option>
          </select>
          <input type="text" onChange={changeSearchValue} value={searchValue} className="form-input" />
        </form>
        <div>
          <button onClick={() => {setFilter(colFilter, conditionFilter, searchValue)}} className="btn modal-btn">Применить</button>
        </div>
      </div>
    </div>
  )
}
export default Modal
