<template>
  <div>

    <div class="card small z-depth-2 hoverable">
        <div class="card-content">
          <span class="card-title activator">
            Дом №{{ house.title }}
            <i class="material-icons right teal-text">settings</i>
          </span>
          <span v-show="!editMode">
            <pair :data="streetPair" color="green"></pair>
            <pair :data="groupPair"></pair>
            <pair :data="ownerPair" color="blue"></pair>
            <pair :data="phonePair"></pair>
            <pair :data="lastPair"></pair>
            <pair :data="valuePair" color="red"></pair>

          </span>
          <input class="edit"
                 v-show="editMode"
                 v-focus="editMode"
                 :value="house.title"
                 @keyup.enter="doneEdit"
                 @keyup.esc="cancelEdit"
                 @blur="doneEdit">

        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">
            Дом №{{ house.title }}
            <i class="material-icons right teal-text">close</i>
          </span>
          <p>Here is some more information about this product that is only revealed once clicked on.</p>
        </div>
        <div class="card-action">
          <a href="#!" class="green-text" @click="doEdit()"><i class="material-icons">mode_edit</i></a>
        </div>
    </div>


  </div>
</template>

<script type="text/babel">
  import {mapActions} from 'vuex'
  import api from '../api/electro'
  import pair from './pair.vue'
  export default{
    props: ['house'],
    data () {
      return {
        editMode: false
      }
    },
    computed: {
      street () {
        return api
                .getStreetById(this.house.street_id)
      },
      group () {
        return api
                .getGroupById(this.house.group_id)
      },
      streetPair () {
        return {
          name: 'Улица:',
          value: this.street.title
        }
      },
      groupPair () {
        return {
          name: 'Группа:',
          value: this.group.title
        }
      },
      ownerPair () {
        return {
          name: 'ФИО:',
          value: 'Фамилия Имя Отчество'
        }
      },
      phonePair () {
        return {
          name: 'Телефон:',
          value: '(050) 123-45-67'
        }
      },
      lastPair () {
        return {
          name: 'Передача показаний:',
          value: '12/12/2016'
        }
      },
      valuePair () {
        return {
          name: 'Показания:',
          value: 226
        }
      }
    },
    methods: {
      ...mapActions([
        'selectHouse',
        'editHouse'
      ]),
      doEdit () {
        this.editMode = !this.editMode
      },
      doneEdit (e) {
        const value = e.target.value.trim()
        const {house} = this
        if (value && this.editMode) {
          this.editStreet({house, value})
        }
        this.cancelEdit()
      },
      cancelEdit () {
        this.editMode = false
      }
    },
    components: {pair}
  }

</script>
