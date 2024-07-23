<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BoardPopup from './BoardPopup.vue';

const cells = Array.from({ length: 25 }, (_, index) => index + 1);

interface Item {
  id: number,
  idx: number,
  name: string,
  src: string,
  count: number,
  isSelected?: any,
}

const items = ref<Item[]>([]);
const selected_item = ref<Item | null>(null);
const is_popup_visible = ref(false);

const loadItems = () => {
  const savedItems = localStorage.getItem('inventoryItems');
  if (savedItems) {
    items.value = JSON.parse(savedItems);
  } else {
    items.value = [
      { id: 0, idx: 1, name: 'item_1', src: '/src/img/item_1.png', count: 4 },
      { id: 1, idx: 2, name: 'item_2', src: '/src/img/item_2.png', count: 2 },
      { id: 2, idx: 3, name: 'item_3', src: '/src/img/item_3.png', count: 5 }
    ];
  }
};



const saveItems = () => {
  localStorage.setItem('inventoryItems', JSON.stringify(items.value));
};



const onDragStart = (event: any, item: any) => {
  event.dataTransfer.setData('item', JSON.stringify(item));
};


const onDrop = (event: any, cell: number) => {
  event.preventDefault();

  const item = JSON.parse(event.dataTransfer.getData('item'));
  const existing_item_index = items.value.findIndex(i => i.idx === cell);

  if (existing_item_index !== -1) {
    return;
  }

  const old_item_index = items.value.findIndex(i => i.idx === item.idx);
  if (old_item_index !== -1) {
    items.value[old_item_index].idx = cell;
  }

  saveItems();
};

const onDragOver = (event: any) => {
  event.preventDefault();
};


const openPopup = (item: any) => {
  selected_item.value = item;
  is_popup_visible.value = true;
};

const closePopup = () => {
  is_popup_visible.value = false;
};

const deleteItem = (item: number, id: number) => {

  items.value[id].count = items.value[id].count - item;

  if (items.value[id].count === 0) {
    items.value.splice(id, 1);
  }

  saveItems();

  closePopup();
};


onMounted(() => {
  loadItems();
});
</script>

<template>
  <article class="Board" @click.self="closePopup">
    <div class="Board__inventorySection">
      <div class="Board__inventorySectionLeft">
        <img src="/src/img/Img Blur.png" alt="" class="Board__image">
        <div class="Board__inventorySectionSkeleton is-loading">
          <h2 v-for="n in 7" :key="n" :class="`Board__inventorySectionSkeleton_${n}`"></h2>
        </div>
      </div>

      <div class="Board__inventorySectionRight">
        <div v-for="cell in cells" :key="cell" class="grid-item" @drop="onDrop($event, cell)" @dragover="onDragOver">

          <div v-for="(item, index) in items" :key="item.idx">

            <img v-if="item.idx === cell" :src="item.src" :class="['grid-item-image', { 'selected': item.isSelected }]"
              draggable="true" @dragstart="onDragStart($event, item)" @click="openPopup(item)" />

            <div v-if="item.count && item.idx === cell" class="Board__inventorySectionCount">{{ item.count }}</div>

          </div>
        </div>


        <BoardPopup v-if="is_popup_visible" :visible="is_popup_visible" :item="selected_item" @close="closePopup"
          @delete="deleteItem" />
      </div>

      <div class="Board__inventorySectionBottom">
        <div class="Board__inventorySectionBottomItems">
          <div class="Board__inventorySectionBottomСross">
            <img src="/src/img/Vector.png" alt="">
          </div>
          <div class="Board__inventorySectionBottomSkeleton is-loading">
            <h2></h2>
          </div>
        </div>
      </div>

    </div>


  </article>
</template>

<style lang="scss">
.Board {
  background-color: #1D1D1D;
  width: 100%;
  height: 100vh;
  color: aliceblue;
  position: absolute;
}

.Board__inventorySection {
  position: relative;
  max-width: 785px;
  margin: 0 auto;
  padding-top: 50px;
  height: 596px;
}

.Board__inventorySectionLeft {
  position: absolute;
  border-radius: 12px;
  border: 1px solid #4D4D4D;
  background-color: #262626;
  padding: 18px 14px 24px 14px;
}

.Board__inventorySectionSkeleton {
  padding-top: 20px;

  &_1 {
    background-color: azure;
    height: 26px;
    margin: 0 9px;
    border-radius: 9px;
  }

  &_2 {
    background-color: azure;
    height: 10px;
    margin: 0 40px;
    border-radius: 9px;
    margin-top: 24px;
  }

  &_3 {
    background-color: azure;
    height: 10px;
    margin: 0 23px;
    border-radius: 9px;
    margin-top: 16px;
  }

  &_4 {
    background-color: azure;
    height: 10px;
    margin: 0 33px;
    border-radius: 9px;
    margin-top: 16px;
  }

  &_5 {
    background-color: azure;
    height: 10px;
    margin: 0 38px;
    border-radius: 9px;
    margin-top: 16px;
  }

  &_6 {
    background-color: azure;
    height: 10px;
    margin: 0 48px;
    border-radius: 9px;
    margin-top: 16px;
  }

  &_7 {
    // background-color: azure;
    height: 10px;
    margin: 0 78px;
    border-radius: 9px;
    margin-top: 24px;
  }
}

.Board__inventorySectionSkeleton.is-loading {

  h2,
  p {
    background: linear-gradient(110deg, #3C3C3C 5%, #4D4D4D 18%, #3C3C3C 33%);
    border-radius: 12px;
    background-size: 200% 150%;
    animation: 2.5s shine linear infinite;
  }

}

.Board__inventorySectionRight {
  position: absolute;
  right: 0;
  max-width: 525px;
  width: 100%;
  background-color: #262626;
  border-radius: 12px;
  border: 1px solid #4D4D4D;
  min-height: 500px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  overflow: hidden;
}

.grid-item {
  border: 1px solid #4D4D4D;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #2F2F2F;
    transition: 0.2s ease-in-out;
  }
}



.grid-item-image {
  max-width: 100%;
  max-height: 100%;

  // .selected {
  //   cursor: url('/src/img/cursor_grab.png'), grab;
  //   background-color: rgba(0, 0, 0, 0.2);
  // }

}

.grid-item-image[draggable="true"] {
  cursor: url('/src/img/cursor_hoverpng.png'), auto;
}

.Board__inventorySectionCount {

  color: #4D4D4D;
  background-color: none;
  border-radius: 6px 0px 0px 0px;
  border: 1px solid #4D4D4D;
  width: 16px;
  height: 16px;
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}


.Board__inventorySectionBottom {
  display: flex;
  position: absolute;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #4D4D4D;
  background-color: #262626;
  height: 72px;
  bottom: -50px;
}

.Board__inventorySectionBottomItems {
  padding: 8px 8px 18px 18px;
}

.Board__inventorySectionBottomСross {
  position: absolute;
  top: 0;
  right: 0;
  padding: 14px;
  cursor: pointer;

}

.Board__inventorySectionBottomSkeleton {

  width: 700px;
  height: 36px;
  border-radius: 12px;
  margin-top: 10px;
}

.Board__inventorySectionBottomSkeleton.is-loading {

  h2,
  p {
    background: linear-gradient(110deg, #3C3C3C 5%, #4D4D4D 18%, #3C3C3C 33%);
    border-radius: 12px;
    background-size: 200% 150%;
    animation: 2.5s shine linear infinite;
  }

  h2 {
    height: 36px;
  }

}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>