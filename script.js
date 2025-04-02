// cotação de moedas do dia. Pois se tiver alteração no dolar por exemplo mudamos aqui. 
const USD = 4.87
const EUR = 5.32
const GBP = 6.08


// acessando o input pelo nome dele (id), utilizando seletores 
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// quero observar o evento, (quando entrar conteudo aqui dentro, vc vai executar essa função), usando arrow function para isso 
// estamos manipulando o input amount para receber somente números. 

amount.addEventListener("input", () => {
 //  console.log(amount.value) só para ver se esa pegando correto 

  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "") // verifico o caracteres do tipo texto, e linha de baixo com o replace é para substituir por nada, ou seja, nao aceita caracter que nao seja numeros. 
})

// capturando o evento do formulario (enviar)
form.onsubmit = (event) => { 
 event.preventDefault() // evitando o recarregamento 
 
 switch (currency.value) { 
   case "USD": 
    convertCurrency(amount.value, USD, "US$") 
    break 
   case "EUR": 
    convertCurrency(amount.value, EUR, "€")
    break
   case "GBP": 
    convertCurrency(amount.value, GBP, "£")
    break
 }
}

// função para converter a moeda 
// try catch em ação, description.textContent para manipular.  
 function convertCurrency (amount, price, symbol) {
   try { 
    // exibindo a cotação da moeda selecionada. 
     description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}` 

     //calcula o total 
     let total = amount * price

     //formatando o valor total
     total = formatCurrencyBRL(total).replace("R$", "")

     //exibindo o total  
     result.textContent = `${total} Reias`

    //aplica a classe que exibe o footer para mostrar o resultado 
     footer.classList.add("show-result")
   } catch(error) { 
      //remove a clase do footer (em caso de erro ne)
      footer.classList.remove("show-result")
      
      console.log(error)
      alert("Não foi possível converter")
   }
 }

 //formatando parte da descrição, dos valores de cada moeda. 
 function formatCurrencyBRL(value)  {
  //converte para número para utilizar o toLocalString, para formatar no padrão BRL (R$ 0,00) 
   return Number(value).toLocaleString("pt-BR", { 
    style: "currency", 
    currency: "BRL",
   })
  
 }