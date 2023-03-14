<template>
    <div class="main-container">
      <div class="header">
        <div class="search">
          <input type="text" class="search-input" placeholder="Search">
        </div>
        <div class="instruments">
          <div class="bell-icon">
            <vbi-icon-button-base button width="24">
              <template v-slot:default><path d="M17 8c0 4.011 0.947 6.52 1.851 8h-13.702c0.904-1.48 1.851-3.989 1.851-8 0-1.381 0.559-2.63 1.464-3.536s2.155-1.464 3.536-1.464 2.63 0.559 3.536 1.464 1.464 2.155 1.464 3.536zM19 8c0-1.933-0.785-3.684-2.050-4.95s-3.017-2.050-4.95-2.050-3.684 0.785-4.95 2.050-2.050 3.017-2.050 4.95c0 6.127-2.393 8.047-2.563 8.174-0.453 0.308-0.573 0.924-0.269 1.381 0.192 0.287 0.506 0.443 0.832 0.445h18c0.552 0 1-0.448 1-1 0-0.339-0.168-0.638-0.429-0.821-0.176-0.13-2.571-2.050-2.571-8.179zM12.865 20.498c-0.139 0.239-0.359 0.399-0.608 0.465s-0.52 0.037-0.759-0.101c-0.162-0.094-0.283-0.222-0.359-0.357-0.274-0.48-0.884-0.647-1.364-0.373s-0.647 0.884-0.373 1.364c0.25 0.439 0.623 0.823 1.093 1.096 0.716 0.416 1.535 0.501 2.276 0.304s1.409-0.678 1.824-1.394c0.277-0.478 0.114-1.090-0.363-1.367s-1.090-0.114-1.367 0.363z"></path></template> 
              <template v-slot:filled><path d="M12.865 20.498c-0.139 0.239-0.359 0.399-0.608 0.465s-0.52 0.037-0.759-0.101c-0.162-0.094-0.283-0.222-0.359-0.357-0.274-0.48-0.884-0.647-1.364-0.373s-0.647 0.884-0.373 1.364c0.25 0.439 0.623 0.823 1.093 1.096 0.716 0.416 1.535 0.501 2.276 0.304s1.409-0.678 1.824-1.394c0.277-0.478 0.114-1.090-0.363-1.367s-1.090-0.114-1.367 0.363zM19 7.977c-0.004-1.923-0.784-3.666-2.043-4.928-1.264-1.268-3.014-2.055-4.947-2.058-1.448-0.002-2.799 0.437-3.9 1.18-0.457 0.309-0.578 0.931-0.269 1.389s0.931 0.578 1.389 0.269c0.764-0.516 1.708-0.829 2.73-0.837 1.448 0.011 2.684 0.569 3.581 1.47 0.902 0.905 1.458 2.15 1.459 3.526-0.042 1.658 0.173 3.476 0.665 5.277 0.146 0.533 0.695 0.847 1.228 0.701s0.847-0.695 0.701-1.228c-0.443-1.625-0.632-3.25-0.594-4.708 0-0.005 0-0.011 0-0.016 0-0.003 0-0.006 0-0.009zM6.996 8.411l7.59 7.589h-9.437c0.872-1.428 1.783-3.812 1.847-7.589zM0.293 1.707l4.856 4.856c-0.106 0.493-0.155 0.984-0.149 1.45 0 6.114-2.393 8.034-2.563 8.161-0.453 0.308-0.573 0.924-0.269 1.381 0.192 0.287 0.506 0.443 0.832 0.445h13.586l5.707 5.707c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-22-22c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path></template> 
            </vbi-icon-button-base>
          </div>
          <div class="user">
            <div class="user-photo"></div>
            <div class="user-name">Boykovkv</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script lang="ts">

import vbiIconButtonBase from './atom-components/vbi-icon-button-base.vue'

import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'HeaderPanel',
  components: {
    vbiIconButtonBase
  }
  
})
</script>


<style lang="scss" scoped>

.main-container {
  background-color: rgb(233, 245, 247);

  .header {
    width: 100%;
    display: flex;
    align-content: center;

    .search {
      display: flex;
      align-content: center;

      &-input {
        margin: 7px;
        outline: none;
        padding: 5px 15px;
        border-radius: 40px;
        
      }

    }
    
    .instruments {

      display: flex;
      justify-content: end;
      width: 100%;

      .bell-icon {
        margin: 0 7px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
      }

      .user {

        display: flex;
        align-content: center;
        cursor: pointer;
        
        &-photo {
          margin: auto 7px;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          background-image: url("../assets/portrait.jpg");
          background-size: contain;
        }

        &-name {
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          color: rgba(10,10,10, 0.7);
          font-weight: 600;
          margin: 0 10px 0 0;

          &:hover {
            color: rgb(10,10,10);
          }
        }
      }
    }


  }


}

</style>
  