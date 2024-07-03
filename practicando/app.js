
const formulario = document.querySelector('.formulario')
let small = document.querySelector('.small')

let buscador = document.querySelector('#buscador')
let texto = document.querySelector('.texto') 

let parrafo = document.querySelector('.parrafo')

buscador.addEventListener("input", async (e) => {
    e.preventDefault()
    try {
        
        const res =await fetch(`https://swapi.dev/api/people`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        const dt =await data.results.filter( (el) => {
            return el.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;  
        
        });
        let guarda = []
    
        texto.innerHTML = ''
        let info = (guarda.includes(dt)) ? "" : guarda.push(dt)
        //  console.log(guarda)
         guarda.forEach(element => {
            element.forEach(element => {
                // console.log(element.name)
                let p = document.createElement('p') 
                p.classList.add('parrafos_del_texto') 
                p.textContent = element.name
                texto.append(p)
    
                p.addEventListener("click", (e) => {
                    parrafo.innerHTML=""
                    // console.log(e.currentTarget.textContent)
                    const tt =   dt.find((el) => el.name === e.currentTarget.textContent)
                   
    
                                    tt.films.forEach(async(element) => {
                    // console.log(element)
                                            let parrafo2 = document.createElement('p') 
                                            let parrafo3 = document.createElement('p')                           
                                           let yy = await fetch(element,{
                                             method: 'GET',
                                             headers: {
                                                 'Content-Type': 'application/json'
                                             }
                                            })
                                            const res2 = await yy.json()
                                            parrafo2.innerHTML = `<strong>Productor</strong> : ` +res2.producer

                                            const fecha = new Date(res2.created);
                                            const dia = fecha.getDate();
                                            const mes = fecha.getMonth() + 1; // getMonth devuelve el mes base 0 (0-11), por eso se suma 1
                                            const anio = fecha.getFullYear();
                                    
                                            parrafo3.innerHTML = `<strong>Fecha de lanzamiento</strong> : ${dia}/${mes}/${anio}`
                                            parrafo.append(parrafo2)
                                            parrafo.append(parrafo3)

                                        
                                        })
                })
            })
         })
    } catch (error) {
        console.log(error)
    }
    
    
})


