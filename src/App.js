import React, { useEffect, useState, useCallback } from "react"


import './App.css';
import { BiEditAlt, BiTrash } from 'react-icons/bi'
import Image from './asset/deovita_to_bg_white-0db82b10cabe6ba4145b55de4ab11dd2fccc5477a7c55682ae6017de3a7fd638.png'
import InputDate from './component/InputDate';
import InputCPF from './component/InputCpf';
import api from './service/api'

function App() {
  const [nameFun, setNameFun] = useState('')
  const [cpfFun, setCpf] = useState('')
  const [birthdate, setBirthDate] = useState('')
  const [iddata, setIdData] = useState(0)
  const [listFuncionarios, setListFuncionarios] = useState([])

  let listfunc = ([{
    id: 0,
    name: '',
    cpf: '',
    nascimento: '',

  }])

  useEffect(() => {
    const loadAll = async () => {
      let listfuncionarios = await api.get("funcionario")
      console.log(listfuncionarios)
      for (let i in listfuncionarios.data) {
        await listfunc.push(
          {
            id: listfuncionarios.data[i].id,
            name: listfuncionarios.data[i].name,
            cpf: listfuncionarios.data[i].cpf,
            nascimento: listfuncionarios.data[i].nascimento,
          }
        )
      }
      setListFuncionarios(listfunc.filter(f => f.id !== 0))

    }

    loadAll()


  },[])

  
   async function delete_func(id) {
      await api.delete(`funcionario/${id}`)
      const loadAll = async () => {
        let listfuncionarios = await api.get("funcionario")
        
          for (let i in listfuncionarios.data) {
            await listfunc.push(
              {
                id: listfuncionarios.data[i].id,
                name: listfuncionarios.data[i].name,
                cpf: listfuncionarios.data[i].cpf,
                nascimento: listfuncionarios.data[i].nascimento,
              }
            )
          }
          if(listfunc.length>0)
          {
            await setListFuncionarios(listfunc.filter(l=>l.id!==0))
          }
        setIdData(0)
      }

      loadAll()

    }
  

  const cadastrar =  useCallback(async() => {
    let dia = birthdate.substring(0,2)
    let mes = birthdate.slice(-7,-5)
    
    if(Number(dia)>31||  Number(dia)<=0){
      alert("Dia do mês inválido")
      
      return 
    }
    if(Number(mes)>12 ||Number(mes)<=0 ){
      alert("Mês inválido")
      return 
    }
    if (iddata === 0) {
      
      async function cadastra() {
       
        await api.post('funcionario', {
          name: nameFun,
          cpf: cpfFun,
          nascimento: birthdate,

        })
        const loadAll = async () => {
          let listfuncionarios = await api.get("funcionario")
          console.log(listfuncionarios)
          for (let i in listfuncionarios.data) {
            await listfunc.push(
              {
                id: listfuncionarios.data[i].id,
                name: listfuncionarios.data[i].name,
                cpf: listfuncionarios.data[i].cpf,
                nascimento: listfuncionarios.data[i].nascimento,
              }
            )
          }
          setListFuncionarios(listfunc.filter(f => f.id !== 0))
        }

        loadAll()
        setIdData(0)

      }
      await cadastra()
      setNameFun('')
      setCpf('')
      setBirthDate('')

    } else if (iddata > 0) {


      async function atualizar() {
        await api.put(`funcionario/${iddata}`, {
          name: nameFun,
          cpf: cpfFun,
          nascimento: birthdate,

        })
        const loadAll = async () => {
          let listfuncionarios = await api.get("funcionario")
          console.log(listfuncionarios)
          for (let i in listfuncionarios.data) {
            await listfunc.push(
              {
                id: listfuncionarios.data[i].id,
                name: listfuncionarios.data[i].name,
                cpf: listfuncionarios.data[i].cpf,
                nascimento: listfuncionarios.data[i].nascimento,
              }
            )
          }
          setListFuncionarios(listfunc.filter(f => f.id !== 0))
        }

        loadAll()
        setIdData(0)
        
      }
      await atualizar()
      setNameFun('')
      setCpf('')
      setBirthDate('')
  

    }


  })
  function dataAtualFormatada(dataH) {
    let dataN = dataH.substring(0,10)
    let diaN = dataN.slice(-2)
    let mesN = dataN.slice(-5,-3)
    let anoN =  dataH.substring(0,4)
    // let data = new Date(dataN),
    //   dia = data.getDate().toString().padStart(2, '0'),
    //   mes = (data.getMonth() + 1).toString().padStart(2, '0'),
    //   ano = data.getFullYear();
    //   console.log(`o mês é: ${mes}`)
    return `${diaN}/${mesN}/${anoN}`;
  }
  return (
    <div className="App">
      <header >
        <img src={Image} alt="" />
      </header>
      <div className='content'>


        <div className='form_pre'>
          <header >
            <h1>Cadastro de Funcionários</h1>
          </header>

          <input
            onChange={e => setNameFun(e.target.value)}
            type="text"
            placeholder='Nome Completo'
            value={nameFun}

          />
          <InputCPF
            onChange={e => setCpf(e.target.value)}
            value={cpfFun}
          />
          <InputDate
            onChange={e => setBirthDate(e.target.value)}
            value={birthdate}
          />
          <button onClick={cadastrar} >{(iddata) === 0 ? "Cadastrar" : "Update"}</button>
        </div>
        <div className='listfunc'>
          <div>
            <table>
              <caption> Lista de Funcionários cadastrados</caption>
              <thead>
                <tr>
                  <th id="inicio">NOME</th>
                  <th id="thcpf">CPF</th>
                  <th id="thnascimento">NASCIMENTO</th>
                  <th id="fim" colSpan="2">AÇÕES</th>
                </tr>
              </thead>
              
              <tbody>
                {listFuncionarios.map((list, key) => (
                  <tr key={key} >
                    <td id="tdnome">{list.name}</td>
                    <td id="tdcpf">{list.cpf}</td>
                    <td id="tdnascimento">{
                      dataAtualFormatada(list.nascimento)
                    }</td>
                    <td onClick={()=>
                      {
                        setIdData(list.id)
                        setNameFun(list.name)  
                        setCpf(list.cpf)
                        let datanas =  dataAtualFormatada(list.nascimento)
                        setBirthDate(datanas)

                      } 
                    }>
                      <BiEditAlt />
                    </td>
                    <td 
                      
                      onClick={()=> 
                        {  
                         
                          delete_func(list.id)
                        }
                      } >
                          <BiTrash />
                    </td>
                  </tr>
                ))}

              </tbody>


            </table>
          </div>


        </div>
      </div>
    </div>
  );
}

export default App;
