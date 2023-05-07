document.querySelector('button').addEventListener('click', checkPalindrome)
var trash = document.querySelectorAll(".fa-trash")

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

// Array.from(trash).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const palindromes = this.parentNode.parentNode.childNodes[1].innerText
//     fetch('palindromes', {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'palindrome': palindromes
//       })
//     }).then(function (response) {
//         window.location.reload()
//       })
//     });
// });

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', async function() {
    const palindromeToDelete = this.parentNode.parentNode.childNodes[1].innerText;
    console.log('Deleting palindrome:', palindromeToDelete);
    try {
      const response = await fetch('/palindromes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'palindrome': palindromeToDelete
        })
      });
      console.log('Palindrome deleted:', await response.text());
      window.location.reload();
    } catch (err) {
      console.log(`Error deleting palindrome: ${err}`);
    }
  });
});