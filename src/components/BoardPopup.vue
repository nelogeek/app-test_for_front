<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';


const is_hidden = ref(false);
const delete_item_hidden = ref(false);

const decrement_count = ref();

const props = defineProps<{
  visible: any,
  item: any,
}>();

const emit = defineEmits(['close', 'delete']);

const closePopup = () => {
  console.log(222222);
  is_hidden.value = true;

  setTimeout(() => {
    emit('close');
  }, 280);
};

const deleteItem = () => {
  emit('delete', decrement_count.value, props.item.id);
};

const deleteItemContinue = () => {
  delete_item_hidden.value = true;
};

</script>

<template>
  <section class="BoardPopup" :class="{ BoardPopup__hidden: is_hidden }" v-if="visible">
    <!-- <pre>{{ item }}</pre> -->

    <div class="BoardPopup__content">

      <button class="BoardPopup__closeBtn" @click="closePopup">
        <img src="/src/assets/img/Vector.png" alt="">
      </button>

      <div class="BoardPopup__imageWrapper">
        <img :src="item.src" alt="" class="BoardPopup__image" />
        <div class="BoardPopup__line"></div>
      </div>

      <div class="Board__inventorySectionSkeleton is-loading">
        <h2 v-for="n in 6" :key="n" :class="`BoardPopup__skeletonItem_${n}`"></h2>
      </div>

      <div class="BoardPopup__line"></div>


      <button @click="deleteItemContinue()" class="BoardPopup__deleteBtn">Удалить предмет</button>


      <div v-if="delete_item_hidden" class="BoardPopup__deleteItem">
        <div class="BoardPopup__area">
          <input v-model="decrement_count" placeholder="Введите количество" class="BoardPopup__inputCount"></input>
          <div class="BoardPopup__btns">
            <button @click="closePopup()" class="BoardPopup__buttonCansel">Отмена</button>

            <button @click="deleteItem()" class="BoardPopup__buttonContinue">Продолжить</button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>


<style lang="scss">
.BoardPopup__deleteItem {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  width: 100%;
  padding-bottom: 20px;
  padding-top: 20px;
  background-color: #262626;
}

.BoardPopup__area {
  padding: 0px 20px;
  width: 100%;
}

.BoardPopup__inputCount {
  margin-bottom: 20px;
  border: 1px solid #4D4D4D;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  color: #FFFFFF;

  background-color: #262626;

}

.BoardPopup__btns {
  box-shadow: #FA7272;
  display: flex;
  gap: 12px;
}

.BoardPopup__buttonCansel {
  padding: 8px 20px 8px 20px;
  border-radius: 8px;
  border: none;
  background-color: #FFFFFF;
  cursor: pointer;
  box-shadow: 0 0 20px #FA7272;
}

.BoardPopup__buttonContinue {
  padding: 8px 22px 8px 22px;
  border-radius: 8px;
  border: none;
  background-color: #FA7272;
  color: #FFFFFF;
  box-shadow: 0 0 15px #FA7272;
  cursor: pointer;
}

.BoardPopup {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: #262626;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  animation: slidein 0.4s;
  border: 1px solid #4D4D4D;
  opacity: 0.95;
}

.BoardPopup__hidden {
  animation: slideout 0.4s;
}

.BoardPopup__content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.BoardPopup__closeBtn {
  z-index: 999;
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.BoardPopup__imageWrapper {
  position: relative;
}

.BoardPopup__image {
  width: 100%;
  height: auto;
  padding: 55px 60px 0px 60px;
  position: relative;
}

.BoardPopup__line {
  height: 1px;
  margin: 0 15px;
  background-color: #4D4D4D;
  margin-top: 18px;
}


.BoardPopup__skeletonItem {

  &_1 {
    background-color: azure;
    height: 30px;
    margin: 0 20px;
    border-radius: 4px;
  }

  &_2 {
    background-color: azure;
    height: 10px;
    margin: 0 20px;
    border-radius: 4px;
    margin-top: 24px;
  }

  &_3 {
    background-color: azure;
    height: 10px;
    margin: 0 20px;
    border-radius: 4px;
    margin-top: 16px;
  }

  &_4 {
    background-color: azure;
    height: 10px;
    margin: 0 20px;
    border-radius: 4px;
    margin-top: 16px;
  }

  &_5 {
    background-color: azure;
    height: 10px;
    margin: 0 35px;
    border-radius: 4px;
    margin-top: 16px;
  }

  &_6 {
    background-color: azure;
    height: 10px;
    margin: 0 85px;
    border-radius: 4px;
    margin-top: 16px;
  }
}

.BoardPopup__deleteBtn {
  padding: 10px 20px;
  margin: 18px 15px;
  background-color: #FA7272;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

@keyframes slidein {

  from {
    transform: translateX(100vh);
  }

  to {
    transform: translateX(0%);
  }
}

@keyframes slideout {

  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(100vh);
  }
}
</style>
