/*
 * @Author: your name
 * @Date: 2021-07-07 16:06:14
 * @LastEditTime: 2021-09-07 08:47:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/layout/mixins/screenMixin.js
 */
import { debounce } from '@/utils';

const screenMixin = {
  data() {
    return {
      screenType: 'xxl',
      screenLevel: 8,
    };
  },
  created() {
    // 参考 Bootstrap(截至 v4.2) -> layout -> Responsive breakpoints
    this.breakpoints = [
      { minWidth: 1600, type: 'xxl', level: 8 },
      { minWidth: 1400, type: 'xl', level: 7 },
      { minWidth: 1200, type: 'xl', level: 6 },
      { minWidth: 992, type: 'lg', level: 5 },
      { minWidth: 768, type: 'md', level: 3.8 },
      { minWidth: 576, type: 'sm', level: 2.8 },
      { minWidth: 0, type: 'xs', level: 0 },
    ];
    this.screenChange();
    this.screenChange = debounce(this.screenChange, 160);
    window.addEventListener('resize', this.screenChange);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.screenChange);
  },
  methods: {
    screenChange() {
      // 设置当前设备尺寸
      const screenWidth = Math.min(window.screen.width, document.body.clientWidth);
      this.breakpoints.some(point => {
        if (point.minWidth <= screenWidth) {
          [this.screenType, this.screenLevel] = [point.type, point.level];
          this.$store.commit('app/setScreenType', point);
          return true;
        }
        return false;
      });
    },
  },
};

export default screenMixin;
