<template>
  <div class="row">
    <div class="col s12">
      <div class="card-panel">
        <h5>
          Дома
          <a href="#!" class="green-text right" @click="doEdit()"><i class="tiny material-icons">add</i></a>
        </h5>
        <div class="row" v-show="loaded">
          <div class="col s6" v-if="!editMode" v-for="p in houses" :class="{active: p === current}"
               transition="fade">

            <house :house="p"></house>
          </div>
        </div>

        <li class="collection-item" v-if="editMode">
        <form>
          <div class="row">
            <div class="input-field col s12">
              <input
                      id="street"
                      type="text"
                      class="validate"
                      v-focus="editMode"
                      @keyup.enter="doneEdit"
                      @keyup.esc="cancelEdit">
              <label for="street">Название</label>
            </div>
          </div>
        </form>
        <spinner :loaded="loaded"></spinner>        
      </li>
   
      </div>
    </div>
  </div>

</template>

<script type="text/babel">
  import {mapGetters, mapActions} from 'vuex'
  import Spinner from './Spinner.vue'
  import house from './house.vue'
  export default {
    data () {
      return {
        editMode: false
      }
    },
    computed: mapGetters({
      houses: 'allHouses',
      loaded: 'loadedHouse',
      current: 'currentHouse'
    }),
    methods: {
      ...mapActions([
        'selectHouse',
        'addHouse'
      ]),
      doEdit () {
        this.editMode = !this.editMode
      },
      doneEdit (e) {
        const value = e.target.value.trim()
        if (value && this.editMode) {
          this.addHouse(value)
        }
        this.cancelEdit()
      },
      cancelEdit () {
        this.editMode = false
      }
    },
    components: {Spinner, house}
  }

</script>

<style lang="scss" type="text/scss">
  .active {
    a {
      color: #fff;
    }
  }

  .fade-transition {
    opacity: 1;
    transition: all .45s linear;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }

    .card-panel {
    li {
      list-style-type: none;
    }
  }

</style>
