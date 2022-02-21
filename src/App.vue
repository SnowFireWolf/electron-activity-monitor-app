<template>
  <nav>
    <router-link class="link" to="/">Home</router-link>
    <router-link class="link" to="/ram">RAM</router-link>
    <router-link class="link" to="/gpu">GPU</router-link>
    <router-link class="link" to="/network">Network</router-link>
    <router-link class="link" to="/allProcess">All Processes</router-link>
  </nav>
  <router-view/>
</template>

<style>
#wrapper {
  font-family: 'Roboto', sans-serif;
  font-family: 'Rubik', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  margin: .4rem;
  padding: .5rem .7rem;
  border-radius: 7px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a:hover {
  background-color: #ececec;
  color: #000000;
}

nav a:active {
  background-color: #dddddd;
  color: #000000;
}

nav a.router-link-exact-active {
  color: #2369ff;
  font-weight: bold;
}




.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.wrapper {
  margin: auto;
  margin-left: 5%;
  margin-right: 5%;
}

@media screen and (max-width: 768px) {
  .wrapper {
    margin-left: 10%;
    margin-right: 10%;
  }
}

@media screen and (min-width: 920px) {
  .wrapper {
    margin-left: 12%;
    margin-right: 12%;
  }
}
</style>
