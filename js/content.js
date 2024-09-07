"use strict";
!(function (e, t) {
  const o =
    ("undefined" != typeof chrome && chrome) ||
    ("undefined" != typeof browser && browser) ||
    void 0;
  if (!o) return;
  if ("404 Not Found" === t.title) return;
  if (!t.querySelector("ytd-app")) return;
  const n = -1 !== navigator.userAgent.indexOf("Firefox"),
    a = "msfy",
    i = a + "-outer-message",
    l = a + "-inner-message",
    c = {
      showVideoIndex: !1,
      preserveSelection: !1,
      sortPlaylistNames: !1,
      noRemovalConfirmation: !1,
      findDuplicatesBackwards: !1,
      positioning: "center",
    },
    s = (t, o) =>
      ((t, o = i, n = e) => n.dispatchEvent(new CustomEvent(o, t)))({
        detail: JSON.stringify({ type: t, value: o }),
      });
  function r(e) {
    try {
      const t = JSON.parse(e.detail),
        { type: n, value: a } = t;
      switch (n) {
        case "blacklisted":
        case "callout":
        case "counts":
        case "handle":
        case "barPosition":
        case "filterPosition":
          o.storage.local.set({ [n]: a });
          break;
        case "url":
          o.runtime.sendMessage(t);
      }
    } catch (e) {}
  }
  function d(e) {
    const { type: t, value: o } = e;
    if ("command" === t) s(t, o);
  }
  function u(e) {
    return Object.keys(e).length && s("options-changed", e), e;
  }
  function f(e) {
    let t;
    for (t in (delete e.dark, delete e.counts, e))
      e[t] = e[t].hasOwnProperty("newValue")
        ? e[t].newValue
        : c.hasOwnProperty(t)
        ? c[t]
        : void 0;
    t && u(e);
  }
  function m() {
    e.removeEventListener(l, r, !0),
      o.runtime.onMessage.removeListener(d),
      o.storage?.onChanged.removeListener(f),
      s("destroy");
  }
  n && m(),
    location,
    (function e(t) {
      const a = o.runtime.connect();
      if (!n) {
        function i(t) {
          n ? t.error : o.runtime.lastError;
          t.onDisconnect.removeListener(i),
            setTimeout(() => {
              !o.runtime.id ? m() : e(!0);
            }, 100);
        }
        a.onDisconnect.addListener(i);
      }
    })(),
    e.addEventListener(l, r, !0),
    o.runtime.onMessage.addListener(d),
    o.storage.onChanged.addListener(f),
    (function () {
      if (!t.querySelector("html[data-cast-api-enabled]")) {
        const e = () => {
            const e = {};
            [
              "addToPlaylist",
              "addToQueue",
              "addToWatchLater",
              "addVideosFromFile",
              "callout1",
              "callout2",
              "callout3",
              "callout4",
              "callout5",
              "callout6",
              "callout7",
              "callout8",
              "cancel",
              "caseSensitive",
              "channelName",
              "chooseOutputFormat",
              "clickToClose",
              "close",
              "confirmRemoveContent",
              "copy",
              "cut",
              "deselectAllVideos",
              "donate",
              "downloadSelection",
              "extensionName",
              "filterHelpTooltip",
              "invalidData",
              "invalidFilter",
              "keys",
              "loadEntirePlaylist",
              "loadingEntirePlaylist",
              "localeDir",
              "moveAfter",
              "moveToBottom",
              "moveToTop",
              "noDuplicatesFound",
              "paste",
              "reloadRequired",
              "remove",
              "removeVideos",
              "selectAllVideos",
              "selectDuplicates",
              "selectWithFilter",
              "selected",
              "title",
              "watched",
            ].forEach((t) => (e[t] = ((e) => o.i18n.getMessage(e))(t)));
            const t = { messages: e };
            s("data", t);
          },
          n = (e) => {
            const n = t.documentElement.hasAttribute("dark");
            return n !== (e.dark || !1) && o.storage.local.set({ dark: n }), e;
          },
          a = t.createElement("script");
        (a.src = o.runtime.getURL("js/polymer.js")),
          (a.onload = (t) => {
            a.remove(), o.storage.local.get().then(u).then(n), e();
          }),
          t.documentElement.appendChild(a);
      }
    })();
})(window, document);
