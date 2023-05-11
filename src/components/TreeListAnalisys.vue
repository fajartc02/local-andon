<template>
  <div>
    <button v-if="!hide" class="btn btn-primary" @click="addNode">
      Buat Analisis Baru
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
      <span class="icon" slot="addTreeNodeIcon">🌲</span>
      <span class="icon" slot="addLeafNodeIcon">🍃</span>
      <span class="icon" slot="editNodeIcon">✏️</span>
      <span class="icon" slot="delNodeIcon">🗑️</span>
      <span class="icon" slot="leafNodeIcon">🍃</span>
      <span class="icon" slot="treeNodeIcon">🌲</span>
    </vue-tree-list>
    <!-- <button @click="getNewTree">Get new tree</button>
    <pre>
      {{ newTree }}
    </pre> -->
  </div>
</template>

<script>
import axios from "axios";
import { VueTreeList, Tree, TreeNode } from "vue-tree-list-new";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    VueTreeList,
  },
  data() {
    return {
      data: new Tree([]),
      newTree: null,
    };
  },
  computed: {
    ...mapState(["newAnalisys"]),
  },
  props: {
    hide: Boolean,
  },
  watch: {
    data: {
      handler() {
        console.log(this.data);
        console.log(this.data.children);
        console.log(JSON.parse(this.data));
        this.getNewTree();
        this.actionUpdateAnalisys(this.newTree.children);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["actionUpdateAnalisys"]),
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

    addNode() {
      var nodeMan = new TreeNode({ name: "MAN", isLeaf: false });
      var nodeMc = new TreeNode({ name: "MACHINE", isLeaf: false });
      var nodeMat = new TreeNode({ name: "MATERIAL", isLeaf: false });
      var nodeMet = new TreeNode({ name: "METHODE", isLeaf: false });
      var nodeEnv = new TreeNode({ name: "ENVIRONTMENT", isLeaf: false });
      if (!this.data.children) this.data.children = [];
      this.data.addChildren(nodeMan);
      this.data.addChildren(nodeMc);
      this.data.addChildren(nodeMat);
      this.data.addChildren(nodeMet);
      this.data.addChildren(nodeEnv);
      this.actionUpdateAnalisys(this.newTree);
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
    getAnalisys() {
      console.log(this.$route.query.v_);
      axios
        .get(
          `${process.env.VUE_APP_HOST}/why_analisys/get/${this.$route.query.v_}`
        )
        .then((result) => {
          console.log(result);
          if (result.data.data.length > 0) {
            let json_analisys = JSON.parse(result.data.data[0].json_string);
            this.data = new Tree(json_analisys);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    console.log(this.newTree);
    this.getAnalisys();
  },
};
</script>
