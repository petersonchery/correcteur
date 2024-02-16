<script>
  function resetForm() {
        document.getElementById("article-form").reset()
    }

     document.getElementById("article-form").addEventListener("submit", function(event) {
        // Appel de la fonction resetForm() pour réinitialiser les champs après la soumission du formulaire
        resetForm()
    });
</script>
