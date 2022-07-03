import './styles/app.css'
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Row from "./components/Row";
import Modal from "./components/Modal";
import Loader from './components/Loader';

function App() {
  const [rows, setRows] = useState([
    {id: 1, disable: true, firstCol: 'Дата', secondCol: 'Название', thirdCol: 'Количество', fourthCol: 'Расстояние'},
    {id: 2, firstCol: '', secondCol: '', thirdCol: '', fourthCol: ''},
    {id: 3, firstCol: '', secondCol: '', thirdCol: '', fourthCol: ''},
    {id: 4, firstCol: '', secondCol: '', thirdCol: '', fourthCol: ''}
  ])


  const [showRows, setShowRows] = useState([])
  
  const [filterIsActive, setFilterIsActive] = useState(false)

  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get('https://test-for-welbex-default-rtdb.firebaseio.com/rows.json')
      if (data) {
        setRows(data)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      await axios.put('https://test-for-welbex-default-rtdb.firebaseio.com/rows.json', rows)
    }
    fetchData()
  }, [rows])

  const addRow = () => {
    setRows([...rows, {id: rows.length + 1, firstCol: '', secondCol: '', thirdCol: '', fourhtCol: ''}])
  }

  const changeRow = (event, id, colIdx) => {
    setRows([...rows].map(row => {
      if (row.id - 1 === id) {
        console.log(colIdx)
        return {
          ...row,
          [colIdx]: event.target.value
        }
      }
      return row
    }))
    console.log(rows)
  }

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const resetFilter = () => {
    setFilterIsActive(false)
    setShowRows([rows[0]])
  }

  const setFilter =(colFilter, conditionFilter, searchValue) => {
    setFilterIsActive(true)
    let filteredRows = [rows[0]]
    rows.forEach(row => {
      if (conditionFilter === 'equal') {
        if(row[colFilter] === searchValue) {
          filteredRows.push(row)
      } else if (conditionFilter === 'include') {
        if (row[colFilter].includes(searchValue)) {
          filteredRows.push(row)
        }
      } else if (conditionFilter === 'more') {
        if (row[colFilter] > searchValue) {
          filteredRows.push(row)
        }
      } else if (conditionFilter === 'less') {
        if (row[colFilter] < searchValue) {
          filteredRows.push(row)
        }
      }
      }
    })
    setShowRows(filteredRows)
    setShowModal(false)
  }

  return (
    <div className="App">
      <button onClick={openModal} className="filter btn">
        Фильтр
        <span className="material-symbols-outlined">
          filter_alt
        </span>
      </button>
      { filterIsActive
        ? <button onClick={resetFilter} className="btn">Сбросить фильтр</button>
        : null
      }
      { showModal
        ? <Modal show={showModal} close={closeModal} setFilter={setFilter}/>
         : null
      }
      { !isLoading
        ? filterIsActive
        ? showRows.map(row => 
            <Row key={row.id} row={row} input={changeRow}/>
          )
        : rows.map(row => 
            <Row key={row.id} row={row} input={changeRow} />
          )
        : <Loader/>
      }
      <button onClick={addRow} className="btn">Добавить Строчку</button>
    </div>
  );
}

export default App;
