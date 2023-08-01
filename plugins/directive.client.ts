import Vue from "vue";

Vue.directive("click-outside", {
  bind: function (el: any, binding: any, vnode: any) {
    el.eventSetDrag = function () {
      el.setAttribute("data-dragging", "yes");
    };
    el.eventClearDrag = function () {
      el.removeAttribute("data-dragging");
    };
    el.eventOnClick = function (event: any) {
      var dragging = el.getAttribute("data-dragging");
      // Check that the click was outside the el and its children, and wasn't a drag
      if (!(el == event.target || el.contains(event.target)) && !dragging) {
        // call method provided in attribute value
        try {
          vnode.context[binding.expression](event);
        } catch {}
      }
    };
    document.addEventListener("touchstart", el.eventClearDrag);
    document.addEventListener("touchmove", el.eventSetDrag);
    document.addEventListener("click", el.eventOnClick);
    document.addEventListener("touchend", el.eventOnClick);
  },
  unbind: function (el: any) {
    document.removeEventListener("touchstart", el.eventClearDrag);
    document.removeEventListener("touchmove", el.eventSetDrag);
    document.removeEventListener("click", el.eventOnClick);
    document.removeEventListener("touchend", el.eventOnClick);
    el.removeAttribute("data-dragging");
  },
});
