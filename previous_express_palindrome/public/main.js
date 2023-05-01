document.querySelector('button').addEventListener('click', checkPalindrome)
var trash = document.querySelector(".fa-trash");

function checkPalindrome(){
    let input = document.querySelector('input').value
   
    fetch(`/api?input=${input}`)
    .then(res => res.json())
    .then(data => {
        showResult(data)

        function showResult (data){
            if (data.isPali === true){
                document.querySelector('#result').innerText= "That was a Palindrome!"

            }else{
                document.querySelector('#result').innerText="Sorry that was not a Palindrome..."
        }}
        
    })
    .catch(err => {
        console.log(`error ${err}`)
    })
} 

Array.from(trash).forEach(function(element) {
  console.log("works")
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    fetch('palindromes', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'msg': msg
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});