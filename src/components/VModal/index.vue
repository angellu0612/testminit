<template>
  <AModal
    id="telemetry_plan_schedule_modal"
    v-draggable="{ node: getDragTarget, enable: draggable, decider }"
    v-bind="$attrs"
    :mask="mask && !draggable"
    :mask-closable="maskClosable && !draggable"
    :width="width"
    class="modal"
    :class="{ 'modal-draggable': draggable }"
    v-on="$listeners"
    @ok="close"
  >
    <slot />
    <template v-if="$scopedSlots.footer" #footer>
      <slot name="footer" />
    </template>
  </AModal>
</template>

<script>
import { isNumber, setStyleProperty } from '@/utils';

export default {
  name: 'VModal',
  inheritAttrs: false,
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    mask: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [Number, String],
      default: 520,
    },
    draggable: Boolean,
  },
  methods: {
    getDragTarget(node) {
      const root = node.querySelector('.ant-modal-wrap');
      setStyleProperty(root, 'width', isNumber(this.width) ? `${this.width}px` : this.width);
      return root;
    },
    close() {
      if (!this.$listeners.ok) {
        this.$emit('change', false);
      }
    },
    // `modal-body` 的子节点不可拖动
    decider(node, root) {
      const body = root.querySelector('.ant-modal-body');
      return !this.isChild(node, body);
    },
    isChild(node, parent) {
      return node !== parent && parent.contains(node);
    },
  },
};
</script>

<style lang="less" scoped>
// .modal {
//   /deep/ .ant-modal-content {
//     background: #0a0d3e url('../../assets/images/modal-bg.png') no-repeat center;
//     background-size: 100% 100%;
//     // 裁剪背景色, 以求符合图片边框
//     clip-path: polygon(4% 0%, 100% 0%, 100% 95.6%, 97.3% 100%, 2.8% 100%, 0 95.4%, 0% 6%);
//     box-shadow: none;
//     border: none;
//     padding-top: 8px;

//     .ant-modal-close {
//       top: 8px;
//       color: inherit;
//     }

//     .ant-modal-close-x {
//       font-size: 20px;
//     }
//   }

//   /deep/ .ant-modal-title {
//     text-align: center;
//     font-size: 16px;
//     font-weight: bold;
//   }
// }

.modal-draggable {
  /deep/ .ant-modal-wrap {
    margin: auto;
    overflow: hidden;
    // 默认偏移 100px
    top: 100px;
    bottom: unset;

    .ant-modal {
      padding-bottom: 0;
      top: 0;
    }

    .ant-modal-body {
      overflow: auto;

      & > * {
        cursor: auto;
      }
    }
  }
}
</style>
