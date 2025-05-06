<template>
  <div>
    <div v-if="!report">
      <button class="btn btn-primary" @click="addNode">
        Tambah Analisis {{whyCategory}}
      </button>
      <vue-tree-list
        @click="onClick"
        @change-name="onChangeName"
        @delete-node="onDel"
        @add-node="onAddNode"
        :model="data"
        default-tree-node-name="Analisa bercabang baru"
        default-leaf-node-name="Masukan analisa kamu"
        v-bind:default-expanded="true"
      >
        <!-- <template v-slot:leafNameDisplay="slotProps">
          <span>
            {{ slotProps.model.name }}
            <span class="muted">#{{ slotProps.model.id }}</span>
          </span>
        </template> -->
        <div class="row">
          <div class="col">
            <span class="icon mdi mdi-plus-thick mx-2" slot="addTreeNodeIcon"> </span>
          </div>
          <div class="col">
            <span class="icon mdi mdi-playlist-plus" slot="addLeafNodeIcon"> </span>
          </div>
          <div class="col">
            <span class="icon mdi mdi-pencil" slot="editNodeIcon"> </span>
          </div>
          <div class="col">
            <span class="icon mdi mdi-delete" slot="delNodeIcon"> </span>
          </div>
          <div class="col">
            <span class="icon mdi mdi-arrow-right-bottom-bold" slot="leafNodeIcon"> </span>
          </div>
          <div class="col">
            <span class="icon mdi mdi-layers" slot="treeNodeIcon"> </span>
          </div>
        </div>
      </vue-tree-list>
    </div>
    <div v-else-if="report" class="container" style="vertical-align: top!important;">
      <!-- <div class="row">
        <div class="col-12 bg-danger border p-1 text-light">
          {{ errName }}
        </div>
      </div> -->
      <div class="row" >
          <table class="border">
            <template v-for="(child) in newTree.children">
              <tr :key="child.id">
                <td style="max-width: 80px;">
                  <p class="m-0 p-0" :style="`text-decoration: ${child.children ? '' : 'line-through'}`">{{ child.name }}</p>
                </td>
                <td>
                  <!-- <ul v-if="child.children" class="list-group p-0 m-0" style="font-size: 9px!important;text-align: left;">
                      <li v-for="(itm, noP) in child.children" :key="itm.id" class="list-group-item p-1">
                        <p class="m-0 p-0">{{noP + 1}}.{{ itm.name.length > 30 && child.children > 1 ? itm.name.slice(0,31) + '...' : itm.name }}</p>
                        <ul v-if="itm.children" class="list-group p-1">
                          <li v-for="(chld, noC) in itm.children" :key="chld.id" :class="`${noC == itm.children.length - 1 ? 'list-group-item p-0 text-danger' : 'list-group-item p-1'}`" class="list-group-item p-1">
                            <p class="m-0 p-0" >{{ chld.name.length > 30 && itm.children.length > 3 ? chld.name.slice(0,31) + '...' : chld.name }}</p>
                          </li>
                        </ul>
                      </li>
                  </ul> -->
                  <table v-if="child.children">
                    <tr v-for="(itm, noP) in child.children" :key="itm.id" >
                      <td style="max-width: 100px;">
                        <p class="m-0 p-0">{{noP + 1}}.{{ itm.name.length > 40 && child.children > 1 ? itm.name.slice(0,41) + '...' : itm.name }}</p>
                      </td>
                      <td style="max-width: 100%;" v-for="(chld, noC) in itm.children" :key="chld.id" :class="`${noC == itm.children.length - 1 ? 'list-group-item p-0 text-danger' : 'list-group-item p-1'}`" >
                        <p class="m-0 p-0" >{{ chld.name.length > 40 && itm.children.length > 3 ? chld.name.slice(0,41) + '...' : chld.name }}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </template>
          </table>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";
import { VueTreeList, Tree, TreeNode } from "vue-tree-list-new";
import { mapActions, mapState } from "vuex";


export default {
  components: {
    VueTreeList
  },
  data() {
    return {
      data: new Tree([]),
      newTree: null,
      
    };
  },
  computed: {
    ...mapState(["newAnalisys","newAnalisys2"]),
  },
  props: {
    hide: Boolean,
    whyCategory: String,
    errName: String,
    report: Boolean
  },
  watch: {
    data: {
      handler() {
        console.log(this.data);
        console.log(this.data.children);
        console.log(JSON.parse(this.data));
        this.getNewTree();
        if(this.whyCategory == "TERJADI"){
          this.actionUpdateAnalisys(this.newTree.children);
        }
        if(this.whyCategory == "LAMA"){
          this.actionUpdateAnalisys2(this.newTree.children);
        }
      },
      deep: true,
    },
    newTree: function() {
      if(this.newTree) {
        console.log(this.newTree);
        // this.newTree.children.forEach(itm => {
        //   console.log(itm);
        // })
        // function getParent(data, wanted) {
        //     // looping
        //     // insert row baru di dalam
        // }
      }
    }
  },
  methods: {
    ...mapActions(["actionUpdateAnalisys","actionUpdateAnalisys2"]),
    onDel(node) {
      console.log(node);
      node.remove();
    },

    onChangeName(params) {
      console.log(params);
    },

    onAddNode(params) {
      console.log(params);
    },

    onClick(params) {
      console.log(params);
    },

    async addNode() {
      var nodeRealProblem = new TreeNode({ name: "Masukan Real Problem", isLeaf: false });
      // var nodeMc = new TreeNode({ name: "MACHINE", isLeaf: false });
      // var nodeMat = new TreeNode({ name: "MATERIAL", isLeaf: false });
      // var nodeMet = new TreeNode({ name: "METHODE", isLeaf: false });
      // var nodeEnv = new TreeNode({ name: "ENVIRONTMENT", isLeaf: false });
      if (!this.data.children) this.data.children = [];
      this.data.addChildren(nodeRealProblem);
      // this.data.addChildren(nodeMc);
      // this.data.addChildren(nodeMat);
      // this.data.addChildren(nodeMet);
      // this.data.addChildren(nodeEnv);
      if(this.whyCategory == "TERJADI"){
       await this.actionUpdateAnalisys(this.newTree);
      }
      if(this.whyCategory == "LAMA"){
       await this.actionUpdateAnalisys2(this.newTree);
      }
    },

    getNewTree() {
      var vm = this;
      function _dfs(oldNode) {
        var newNode = {};

        for (var k in oldNode) {
          if (k !== "children" && k !== "parent") {
            newNode[k] = oldNode[k];
          }
        }

        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = [];
          for (var i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]));
          }
        }
        return newNode;
      }

      vm.newTree = _dfs(vm.data);
    },
    async getAnalisys() {
      await axios
        .get(
          `${process.env.VUE_APP_HOST}/why_analisys/get/${this.$route.query.v_}?analisys_category=${this.whyCategory}`
        )
        .then((result) => {
          console.log(result);
          if (result.data.data.length > 0) {
            this.$emit('checkAnalysis', true)
            let json_analisys = JSON.parse(result.data.data[0].json_string);
            let mapitm = json_analisys.filter(itm => itm.children)
            console.log(mapitm);
            this.data = new Tree(mapitm);
          }
        })
        .catch((err) => {
          this.$emit('checkAnalysis', false)
          console.log(err);
        });
    },
  },
  mounted() {
    this.getAnalisys();
  },
};
</script>

<style>
.vtl-operation .vtl-icon {
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
}
</style>