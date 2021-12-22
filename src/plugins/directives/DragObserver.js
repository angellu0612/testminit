import { getStyleProperty, isFunction, setStyleProperty, toNumber } from '@/utils';

const getTranslate = target => {
  const str = getStyleProperty(target, 'transform');
  const regExp = /^translate3d\(([+-]?\d+)px, ([+-]?\d+)px, [+-]?\d+px\)$/g;
  const [, x, y] = regExp.exec(str) || [];
  return { x: toNumber(x), y: toNumber(y) };
};

const setTranslate = (target, { x, y }) => {
  setStyleProperty(target, 'transform', `translate3d(${x}px, ${y}px, 0)`);
};

const TRUE = () => true;

class DragObserver {
  constructor(callback, options = {}) {
    if (isFunction(callback)) this.callback = callback;
    /**
     * 鼠标按下的位置
     * @private
     */
    this.mousePosition = { x: 0, y: 0 };
    /**
     * 上一次拖动的位置
     * @private
     */
    this.lastOffset = { x: 0, y: 0 };
    /**
     * 拖动根节点
     * @private
     * @type {HTMLElement|undefined}
     */
    this.target = undefined;
    /**
     * 判断是否可拖动，默认全部可拖动
     * @private
     * @type {function(node: HTMLElement, target: HTMLElement): boolean}
     */
    this.decider = options.decider ?? TRUE;
  }

  get draggable() {
    return this.target?.getAttribute('draggable') === 'true';
  }

  set draggable(bool) {
    this.target?.setAttribute('draggable', bool);
  }

  /**
   * @param target {HTMLElement}
   */
  observe(target) {
    this.target = target;
    setStyleProperty(this.target, 'cursor', 'move');
    this.bindEvent();
  }

  unobserve() {
    setStyleProperty(this.target, 'cursor', 'auto');
    this.removeEvent();
    this.target = undefined;
  }
  /** @private */
  close = () => {
    this.draggable = false;
  };
  /** @private */
  dragEffect = event => {
    this.draggable = this.decider(event.target, this.target);
  };
  /** @private */
  dragStart = event => {
    if (!this.draggable) return;
    event.dataTransfer.effectAllowed = 'all';
    [this.mousePosition.x, this.mousePosition.y] = [event.x, event.y];
    const translate = getTranslate(this.target);
    [this.lastOffset.x, this.lastOffset.y] = [translate.x, translate.y];
  };
  /** @private */
  drag = event => {
    if (!this.draggable) return;
    if (!event.y && !event.x) return;
    const offsetX = event.x - this.mousePosition.x + this.lastOffset.x;
    const offsetY = event.y - this.mousePosition.y + this.lastOffset.y;
    setTranslate(this.target, { x: offsetX, y: offsetY });
    if (this.callback) this.callback(event);
  };
  /** @private */
  dragover = event => {
    const has = event.path.some(elm => elm === this.target);
    if (!has) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  /** @private */
  bindEvent() {
    this.target.addEventListener('mousedown', this.dragEffect);
    this.target.addEventListener('dragstart', this.dragStart);
    this.target.addEventListener('drag', this.drag);
    this.target.addEventListener('dragend', this.close);
    window.document.body.addEventListener('dragover', this.dragover, true);
  }
  /** @private */
  removeEvent() {
    this.target.removeEventListener('mousedown', this.dragEffect);
    this.target.removeEventListener('dragstart', this.dragStart);
    this.target.removeEventListener('drag', this.drag);
    this.target.removeEventListener('dragend', this.close);
    window.document.body.removeEventListener('dragover', this.dragover);
  }
}

export default DragObserver;
