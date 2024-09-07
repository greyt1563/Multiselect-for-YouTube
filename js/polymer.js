"use strict";
!(function (t, e) {
  if (!("customElements" in t)) return;
  const n = "https://www.youtube.com",
    o = "ACTION_ADD_VIDEO",
    i = "ACTION_REMOVE_VIDEO_BY_VIDEO_ID",
    r = -1 !== navigator.userAgent.indexOf("Firefox"),
    a = -1 !== navigator.userAgent.indexOf("Edg/"),
    c = Date.now().toString(36),
    s = "msfy",
    d = s + "-inner-message",
    l = s + "-outer-message",
    p = s + "-donate-button-" + c,
    u = s + "-donate-icon-" + c,
    f = s + "-penalty-icon-" + c,
    h = s + "-wrapper-" + c,
    m = s + "-dialog-" + c,
    b = '.ytd-page-manager[role="main"]',
    $ = s + "-popup-menu",
    y = $ + "-item",
    g = s + "-video-checkbox",
    x = `#${g}.${g}`,
    v = `${b} :not([is-hidden]):not([hidden]) > ${h} > ${x}`,
    w = `${v}[checked]`,
    _ = "rgba(0, 0, 0, 0.5)",
    k = "12px",
    E = s + "-toast",
    T = s + "-progress-bar",
    I = T + "-close",
    A = ["application/json", "text/plain", "text/html"],
    z = {
      counts: { copy: 0, cut: 0, move: 0, paste: 0 },
      preserveSelection: !1,
      sortPlaylistNames: !1,
      noRemovalConfirmation: !1,
      outlineIcon: !1,
      callout: 0,
      handle: null,
      blacklisted: !1,
      findDuplicatesBackwards: !1,
      positioning: "center",
      barPosition: { x: 0, y: t.innerHeight - 72 },
      filterPosition: { x: 0, y: 1 },
      filter: {
        title: { value: "", option: !1 },
        channel: { value: "", option: !1 },
        watched: { value: "100", option: !1 },
      },
    };
  let L,
    M,
    C,
    O = !1;
  const V = (function () {
      let t;
      return {
        get t() {
          return t;
        },
        set t(e) {
          t = e;
        },
        get o() {
          return Array.isArray(t) && t.length > 0;
        },
        get i() {
          return Array.isArray(t) ? t.length : 0;
        },
      };
    })(),
    D = () => "/feed/history" === t.location.pathname,
    R = () => "/playlist" === t.location.pathname,
    P = () => e.querySelectorAll(v),
    S = () => e.querySelectorAll(w),
    N = () => e.querySelector(w),
    Y = () => !!N(),
    H = (t, e) =>
      t.playlistId ? (t[e] = t.videos?.[0]?.childVideoRenderer?.[e]) : t[e],
    j = (t) => t?.parentElement?.parentElement || t?.__dataHost?.__dataHost,
    F = (t) => H(j(t).data, "videoId"),
    U = (t) => H(j(t).data, "setVideoId"),
    B = (t) => j(t).data.isPlayable,
    G = ([...t] = S()) => (R() ? t.filter(B).map(F) : t.map(F)),
    q = () => e.querySelector(b + '[page-subtype="playlist"]')?.__data?.data,
    Q = () => q()?.header?.playlistHeaderRenderer,
    J = () => Q()?.playlistId,
    X = () => Q()?.isEditable || D(),
    W = () => "LL" === J(),
    Z = Y,
    K = () => V.o && !D() && X(),
    tt = (t) => t.shiftKey && !t.ctrlKey && !t.altKey,
    et = (t, e) =>
      `<yt-icon-button id="${t}"><yt-icon icon="${e}"></yt-icon></yt-icon-button>`,
    nt = (t, e) =>
      `<tp-yt-paper-tooltip for="${t}" position="top">${e}</tp-yt-paper-tooltip>`,
    ot = (t = !1, e = 24) => {
      const n = t ? "currentColor" : "#065fd4";
      return `<svg viewBox="0 0 24 24" style="width: ${e}px; height: ${e}px">${`<path d="M2,4H0v18c0,1.1 0.9,2 2,2H20V22H2Z" fill="${n}"/>`}${
        t
          ? `<path d="M22,18H6V2H22M22,0H6C4.9,0 4,0.9 4,2v16c0,1.1 0.9,2 2,2h16c1.1,0 2,-0.9 2,-2V2C24,0.9 23.1,0 22,0Z" fill="${n}"/>`
          : `<path d="M22,0H6C4.9,0 4,0.9 4,2v16c0,1.1 0.9,2 2,2h16c1.1,0 2,-0.9 2,-2V2C24,0.9 23.1,0 22,0Z" fill="${n}"/>`
      }${`<path d="M12,11 9,8 7,10 12,15 21,6 19,4Z" fill="${
        t ? "currentColor" : "#ffffff"
      }"/>`}</svg>`;
    },
    it = (t) => (t.preventDefault(), t.stopPropagation()),
    rt = (e, n = d, o = t) => o.dispatchEvent(new CustomEvent(n, e)),
    at = (t, e) => rt({ detail: JSON.stringify({ type: t, value: e }) }),
    ct = () => at("counts", z.counts);
  function st(t, n) {
    e.querySelectorAll(t).forEach((t) => (t.checked = n));
  }
  function dt() {
    st(x, !0), kt.l();
  }
  function lt() {
    st(x, !1), kt.l();
  }
  function pt(t) {
    if (t && t.getAttribute("position") !== z.positioning)
      return (
        z.positioning,
        t.setAttribute("position", z.positioning),
        "custom" === z.positioning
      );
  }
  function ut(t, e) {
    for (const n of e) {
      if (!t.hasOwnProperty(n)) return;
      t = t[n];
    }
    return t;
  }
  function ft(t, e) {
    if (Array.isArray(t))
      for (let n = 0; n < t.length; n++) {
        const o = ut(t[n], e);
        if (o) return o;
      }
  }
  function ht(t, n) {
    return new Promise((o) => {
      let i = e.querySelector(t);
      if (i) o(i);
      else {
        const r = (n && e.querySelector(n)) || e.documentElement;
        let a = new MutationObserver(() => {
          (i = r.querySelector(t)), i && (a.disconnect(), (a = null), o(i));
        });
        a.observe(r, { childList: !0, subtree: !0 });
      }
    });
  }
  function mt(e) {
    e &&
      !z.blacklisted &&
      new MutationObserver((e, n) => {
        const o = e[0],
          i = o.target,
          r = t.getComputedStyle(i),
          { display: a, visibility: c, opacity: s, color: d } = r;
        if (a) {
          const t = parseFloat(r?.width) || 0,
            l = parseFloat(r?.height) || 0,
            p = parseFloat(
              d?.match(/^rgba\(\d+, \d+, \d+, ([0-9.]+)\)$/)?.[1] || 1
            );
          ("none" === a ||
            "hidden" === c ||
            "1" !== s ||
            t < 20 ||
            l < 20 ||
            1 !== p) &&
            (e.length,
            o.attributeName,
            i.className,
            n.disconnect(),
            (z.blacklisted = !0),
            at("blacklisted", !0),
            Et(!1));
        }
      }).observe(e, {
        attributeFilter: ["style", "class", "hidden"],
        subtree: !0,
      });
  }
  location;
  const bt = (function () {
      const n = e.querySelector("ytd-app");
      function i(t, e, n, o = "setVideoId") {
        const i = {
            webCommandMetadata: {
              sendPost: !0,
              apiUrl: "/youtubei/v1/browse/edit_playlist",
            },
          },
          r = { playlistId: e, actions: n.map((e) => ({ [o]: e, action: t })) };
        return (
          "addedVideoId" !== o && (r.params = "CAFAAQ%3D%3D"),
          { commandMetadata: i, playlistEditEndpoint: r }
        );
      }
      return {
        p: (t, e = n) => e.resolveCommand(t),
        u: (t) => n.handleServiceRequest_(n, t),
        h: (t) => n.sendServiceAjax_(n, t),
        m(t, e = null, o = !0, i = n) {
          if (!e || void 0 !== e[0]) {
            const n = {
              bubbles: !0,
              composed: !0,
              detail: {
                actionName: t,
                optionalAction: o,
                args: e,
                disableBroadcast: !1,
                returnValue: [],
              },
            };
            rt(n, "yt-action", i);
          }
        },
        $() {
          const t = J(),
            e = "/playlist?list=" + t,
            o = {
              endpoint: {
                commandMetadata: {
                  webCommandMetadata: {
                    url: e,
                    rootVe: 5754,
                    webPageType: "WEB_PAGE_TYPE_PLAYLIST",
                    apiUrl: "/youtubei/v1/browse",
                  },
                },
                browseEndpoint: { browseId: "VL" + t },
              },
              pageType: "playlist",
              url: e,
              reload: !1,
            };
          return n.onYtNavigate({ detail: o });
        },
        get v() {
          return n;
        },
        get _() {
          return n.mastheadHeight || 56;
        },
        get k() {
          return t.ytcfg?.get("LOGGED_IN");
        },
        T: {
          get I() {
            return e.querySelector("ytd-miniplayer")?.active;
          },
          get A() {
            return J();
          },
          get L() {
            return G();
          },
          get M() {
            return (([...t] = S()) => t.map(U))();
          },
          get C() {
            const t = [],
              e = this.L;
            if (e.length) {
              z.counts.copy += e.length;
              const n = {
                videoIds: e,
                listType: "PLAYLIST_EDIT_LIST_TYPE_QUEUE",
              };
              this.I ||
                ((n.openMiniplayer = !0),
                (n.onCreateListCommand = {
                  createPlaylistServiceEndpoint: { params: "CAQ%3D" },
                })),
                t.push({ addToPlaylistCommand: n });
            }
            return {
              signalServiceEndpoint: { signal: "CLIENT_SIGNAL", actions: t },
            };
          },
          O(t) {
            const e = this.M;
            (z.counts.cut += e.length), t && (V.t = this.L);
            const n = i("ACTION_REMOVE_VIDEO", this.A, e);
            return (
              (n.playlistEditEndpoint.clientActions = [
                { playlistRemoveVideosAction: { setVideoIds: [...e] } },
              ]),
              n
            );
          },
          get V() {
            const t = this.L;
            return (z.counts.copy += t.length), i(o, "WL", t, "addedVideoId");
          },
          get D() {
            const t = $t.R,
              e = this.M.reverse(),
              n = e.indexOf(t);
            -1 !== n && e.splice(n, 1), (z.counts.move += e.length);
            const o = i("ACTION_MOVE_VIDEO_AFTER", this.A, e);
            return (
              o.playlistEditEndpoint.actions.forEach(
                (e) => (e.movedSetVideoIdPredecessor = t)
              ),
              o
            );
          },
          get P() {
            const t = this.M.reverse();
            return (
              (z.counts.move += t.length),
              i("ACTION_MOVE_VIDEO_AFTER", this.A, t)
            );
          },
          get S() {
            const t = this.M;
            return (
              (z.counts.move += t.length),
              i("ACTION_MOVE_VIDEO_BEFORE", this.A, t)
            );
          },
          N(t) {
            return i(o, this.A, t, "addedVideoId");
          },
          get Y() {
            return { signalServiceEndpoint: { signal: "GET_ACCOUNT_MENU" } };
          },
        },
      };
    })(),
    $t = (function () {
      let t, n;
      const o = () => {
        (t = n = void 0), e.activeElement.blur();
      };
      return {
        H(e) {
          t = n = e;
        },
        j: (o) => ((n = t), o?.focus(), (t = e.activeElement), t),
        F: () => setTimeout(o),
        U: () => (t.blur(), t.focus()),
        get B() {
          return t;
        },
        get G() {
          return n;
        },
        get q() {
          return j(t)?.data?.videoId;
        },
        get R() {
          return j(t)?.data?.setVideoId;
        },
        get J() {
          return t?.id === g;
        },
        get X() {
          return [
            ...e.querySelectorAll(
              'input:not([type="hidden"]):not([type="checkbox"]), textarea'
            ),
          ].some((t) => t.contains(e.activeElement));
        },
      };
    })(),
    yt = (function () {
      let t, n;
      function o(t) {
        let o = e.querySelector("#" + T);
        if (!o) {
          (o = e.createElement("div")), (o.id = T);
          const t = et(I, "close") + nt(I, L.messages.close),
            i = `<header>${`<span id="title">${L.messages.loadingEntirePlaylist}</span>`}${t}</header>`;
          (o.innerHTML = `${i}<div></div>`),
            o.querySelector("#" + I).addEventListener("tap", () => (n = !0)),
            e.body.appendChild(o);
        }
        const i = Math.min(100, Math.round(100 * t)) + "%";
        return (
          (o.lastElementChild.style.width = i),
          (o.lastElementChild.textContent = i),
          (o.style.display = ""),
          o
        );
      }
      const i = (t) =>
          t?.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer
            ?.content?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer
            ?.contents?.[0]?.playlistVideoListRenderer,
        r = (t) =>
          t?.[t.length - 1]?.continuationItemRenderer?.continuationEndpoint;
      async function a() {
        t = !0;
        const e = q(),
          a = ((t) => {
            const e = t?.header?.playlistHeaderRenderer?.numVideosText?.runs;
            if (Array.isArray(e))
              for (const t of e) {
                const e = +t.text?.replace(/[. , ]/g, "");
                if (!isNaN(e)) return e;
              }
            return 5e3;
          })(e),
          c = i(e);
        let s = c?.contents,
          d = r(s),
          l = (s?.length || 0) - (d ? 1 : 0);
        const p = d && o(l / a),
          u = location.href;
        for (; !n && d && location.href === u; ) {
          const t = await bt.h(d);
          (s =
            t?.actions?.[0]?.appendContinuationItemsAction?.continuationItems),
            (d = r(s)),
            (l += (s?.length || 0) - (d ? 1 : 0)),
            o(d ? l / a : 1);
        }
        !(function (e) {
          e
            ? n
              ? ((e.style.display = "none"), (t = n = !1))
              : e.style.animation ||
                (e.addEventListener(
                  "animationend",
                  function o() {
                    e.removeEventListener("animationend", o, !0),
                      (e.style.animation = ""),
                      (e.style.display = "none"),
                      (t = n = !1);
                  },
                  !0
                ),
                (e.style.animation = `4s ${T + "-fade-out"} forwards`))
            : (t = n = !1);
        })(p);
      }
      return {
        W() {
          a();
        },
        get Z() {
          return !r(i(q())?.contents);
        },
        get K() {
          return t;
        },
      };
    })(),
    gt = (function () {
      const n = `${s}-action-menu`;
      let o, i, r, a, c, d, l, p;
      const u = [
        {
          id: s + "-action-move-after",
          handler: Lt,
          icon: "arrow_back",
          label: () => L.messages.moveAfter,
          enabled: () => p && a && c && !r && $t.R,
          separator: () => "bottom",
        },
        {
          id: s + "-action-add-to-queue",
          handler: At,
          icon: "add_to_queue_tail",
          label: () => L.messages.addToQueue,
          enabled: () => a,
        },
        {
          id: s + "-action-add-to-watch-later",
          handler: zt,
          icon: "watch_later",
          label: () => L.messages.addToWatchLater,
          enabled: () => a && !l && bt.k,
        },
        {
          id: s + "-action-add-to-playlist",
          handler: Ot,
          icon: "playlist_add",
          label: () => L.messages.addToPlaylist,
          enabled: () => a && bt.k,
        },
        {
          id: s + "-action-remove-videos",
          handler: St,
          icon: "delete",
          label: () => L.messages.removeVideos,
          enabled: () => a && (c || W()),
        },
        {
          id: s + "-action-move-to-top",
          handler: Mt,
          icon: "vertical_align_top",
          label: () => L.messages.moveToTop,
          enabled: () => a && c && !d && !r,
        },
        {
          id: s + "-action-move-to-bottom",
          handler: Ct,
          icon: "vertical_align_bottom",
          label: () => L.messages.moveToBottom,
          enabled: () => a && c && !d && !r,
        },
        {
          id: s + "-action-select-duplicates",
          handler: Yt,
          icon: "icons:find-in-page",
          label: () => L.messages.selectDuplicates,
          enabled: () => !a && c,
        },
        {
          id: s + "-action-select-filter",
          handler: () => Zt.tt(),
          icon: "icons:filter-list",
          label: () => L.messages.selectWithFilter,
          enabled: () => !Zt.instance,
        },
        {
          id: s + "-action-load-entire-playlist",
          handler: () => yt.W(),
          icon: "icons:archive",
          label: () => L.messages.loadEntirePlaylist,
          enabled: () => R() && !yt.Z && !yt.K,
        },
        {
          id: s + "-download-selection",
          handler: jt,
          icon: "icons:file-download",
          label: () => L.messages.downloadSelection,
          enabled: () => a,
        },
        {
          id: s + "-add-videos-from-file",
          handler: Ft,
          icon: "icons:file-upload",
          label: () => L.messages.addVideosFromFile,
          enabled: () => c && !d,
        },
        {
          id: s + "-action-copy",
          handler: Dt,
          icon: "icons:content-copy",
          label: () => L.messages.copy,
          enabled: () => a,
          separator: () => "top",
        },
        {
          id: s + "-action-cut",
          handler: Pt,
          icon: "icons:content-cut",
          label: () => L.messages.cut,
          enabled: () => a && (c || W()),
        },
        {
          id: s + "-action-paste",
          handler: Rt,
          icon: "icons:content-paste",
          label: () => `${L.messages.paste} (${V.i})`,
          enabled: () => V.o && c && !d,
          separator: () => (a ? "" : "top"),
        },
      ];
      function f(t) {
        t.stopPropagation();
        const e = t.target.id;
        if (e) {
          const t = u.find((t) => t.id === e);
          t && (gt.et(), t.handler() && lt());
        }
      }
      const h = (() => {
        const t = (t = i.at(0)) => (i.at(i.indexOf(t) - 1) || i.at(-1)).focus(),
          e = (t = i.at(-1)) => (i.at(i.indexOf(t) + 1) || i.at(0)).focus(),
          n = {
            Escape: () => gt.et(),
            Home: () => i.at(0).focus(),
            End: () => i.at(-1).focus(),
            Tab: (n, o) => (tt(o) ? t(n) : e(n)),
            ArrowUp: t,
            ArrowLeft: t,
            ArrowDown: e,
            ArrowRight: e,
            " ": (t, e) => f(e),
            Enter: (t, e) => f(e),
          };
        return { handler: (t) => n[t] };
      })();
      function m(t) {
        if (!$t.X) {
          const e = h.handler(t.key);
          if (e) {
            const n = i.find((e) => e === t.target);
            it(t), e(n, t);
          }
        }
      }
      function b() {
        gt.et();
      }
      function g() {
        kt.nt();
      }
      return {
        ot(h, x) {
          const v = !o || p;
          if ((this.et(), v)) {
            p = "number" == typeof h && "number" == typeof x;
            const v = kt.it,
              w = kt.rt;
            (r = v === w),
              (a = !!v),
              (c = X() && bt.k),
              (d = D()),
              (l = "WL" === J());
            const _ = u.filter((t) => t.enabled());
            _.length &&
              (!(function (r, a, c) {
                (o = e.createElement("div")),
                  (o.id = n),
                  (o.innerHTML = `<div id="listbox" class="${$}" tabindex="-1">${r
                    .map(({ id: t, icon: e, label: n, separator: o }) => {
                      const i = o?.();
                      return `<div class="${y}" tabindex="-1" ${
                        i ? `separator="${i}"` : ""
                      }><div id="${t}" tabindex="0"><yt-icon icon="${e}"></yt-icon>${n()}</div></div>`;
                    })
                    .join("")}</div>`),
                  p
                    ? ((o.className = s + "-context-menu"),
                      o.style.setProperty("--x", a + t.scrollX + "px"),
                      o.style.setProperty("--y", c + t.scrollY + "px"),
                      o.style.setProperty("--scroll-y", t.scrollY + "px"),
                      e.body.appendChild(o))
                    : ((o.className = s + "-bar-menu"), kt.ct(o)),
                  (i = [...o.querySelectorAll(`.${y} > div`)]);
              })(_, h, x),
              e.addEventListener("keydown", m, !0),
              o.addEventListener("tap", f, !0),
              o.addEventListener("contextmenu", it, !0),
              t.addEventListener("tap", b),
              t.addEventListener("resize", g, !0));
          }
        },
        et() {
          o &&
            (e.removeEventListener("keydown", m, !0),
            o.removeEventListener("tap", f, !0),
            o.removeEventListener("contextmenu", it, !0),
            t.removeEventListener("tap", b),
            t.removeEventListener("resize", g, !0),
            o.remove(),
            (o = i = null));
        },
      };
    })(),
    xt = (function () {
      const t = s + "-confirm-remove-" + c,
        n = !0;
      let o, i, r;
      const a = (t) => {
          e.removeEventListener("keydown", r, n), o.close(t), i(t), (i = null);
        },
        d = () => {
          if (!o) {
            (o = e.createElement("dialog")),
              (o.id = t),
              (o.className = m),
              (o.innerHTML = (() => {
                const t = L.messages;
                return `<form method="dialog"><header></header><section>${t.confirmRemoveContent}</section><footer><button id="cancel">${t.cancel}</button><button id="submit">${t.remove}</button></footer></form>`;
              })());
            const n = o.querySelector("button#cancel"),
              i = o.querySelector("button#submit");
            n.addEventListener("tap", (t) => a(!1)),
              i.addEventListener("tap", (t) => a(!0)),
              (r = (t) => {
                switch (t.key) {
                  case "Escape":
                    a(!1);
                    break;
                  case " ":
                  case "Enter":
                    a(t.target === i);
                    break;
                  case "Tab":
                  case "ArrowLeft":
                  case "ArrowRight":
                    t.target === n ? i.focus() : n.focus();
                }
                it(t);
              }),
              e.body.appendChild(o);
          }
        };
      return {
        ot() {
          if (!o?.open)
            return (
              !o && d(),
              (o.querySelector("header").textContent = L.messages.removeVideos),
              e.addEventListener("keydown", r, n),
              o.showModal(),
              new Promise((t) => (i = t))
            );
        },
        st() {
          o && (e.removeEventListener("keydown", r, n), o.remove(), (o = null));
        },
        get dt() {
          return t;
        },
      };
    })(),
    vt = (function () {
      const t = s + "-toggle-bar-button-" + c;
      let n;
      const o = (o) => {
        if (o) {
          (n = e.createElement("div")), (n.id = t);
          const i = ot(z.outlineIcon),
            r = L.messages.extensionName;
          (n.innerHTML = `<yt-icon-button id="button">${i}</yt-icon-button><tp-yt-paper-tooltip>${r}</tp-yt-paper-tooltip>`),
            n.firstElementChild.addEventListener("tap", (t) => Et(), !0),
            o.insertBefore(n, o.firstElementChild);
        }
      };
      return {
        tt() {
          !n && ht("#end.ytd-masthead").then(o);
        },
        st() {
          n && (n.remove(), (n = null));
        },
        get dt() {
          return t;
        },
      };
    })(),
    wt = (function () {
      const t = s + "-bezel-" + c;
      let n;
      function o(t) {
        n.style.display = "";
      }
      return {
        tt() {
          !n &&
            (e.getElementById(t) ||
              ((n = e.createElement("div")),
              (n.id = t),
              e.body.appendChild(n),
              n.addEventListener("animationend", o, !0)));
        },
        st() {
          n &&
            (n.removeEventListener("animationend", o, !0),
            n.remove(),
            (n = null));
        },
        U(t) {
          if (n) {
            const o = e.querySelector(`iron-iconset-svg #content-${t} path`);
            o &&
              ((n.innerHTML = `<div id="icon"><svg fill="#fff" viewBox="0 0 24 24" width="80%" height="80%">${o.outerHTML}</svg></div>`),
              (n.style.display = "block"));
          }
        },
        get dt() {
          return t;
        },
      };
    })(),
    _t = (t) => (it(t), gt.et());
  const kt = (function () {
      const o = s + "-bar-" + c,
        i = `${s}:${s}`;
      let r, a, d, l;
      const f = (t, e) =>
          e ? t.setAttribute("disabled", "") : t.removeAttribute("disabled"),
        h = [
          {
            id: s + "-close",
            icon: "close",
            handler: (t) => Et(!1),
            tooltip: () => L.messages.close,
            html() {
              return et(this.id, this.icon) + nt(this.id, L.messages.close);
            },
          },
          {
            html() {
              const t = `<yt-icon id="${u}" icon="${i}-heart"></yt-icon>`;
              return `${(function () {
                const t = n,
                  e = (t, e) =>
                    `<input type="hidden" name="${t}" value="${e}">`;
                return ``;
              })()}${t}`;
            },
          },
          {
            id: "selection",
            update() {
              this.node.text = { simpleText: `${d} / ${a}` };
            },
            html() {
              return `<yt-formatted-string id="${this.id}"></yt-formatted-string><span>${L.messages.selected}</span>`;
            },
          },
          {
            id: "select",
            icon: `${i}-select-all`,
            handler: (t) => (_t(t), dt()),
            tooltip: () => L.messages.selectAllVideos,
            update() {
              f(this.node, d === a);
            },
            html() {
              return (
                et(this.id, this.icon) + nt(this.id, L.messages.selectAllVideos)
              );
            },
          },
          {
            id: "unselect",
            icon: `${i}-unselect-all`,
            handler: (t) => (_t(t), lt()),
            tooltip: () => L.messages.deselectAllVideos,
            update() {
              f(this.node, !d);
            },
            html() {
              return (
                et(this.id, this.icon) +
                nt(this.id, L.messages.deselectAllVideos)
              );
            },
          },
          {
            id: "menu",
            icon: "more_vert",
            handler: (t) => (it(t), gt.ot()),
            update() {
              f(this.node, !(d || X() || !Zt.lt));
            },
            html() {
              return et(this.id, this.icon);
            },
          },
        ];
      function m() {
        (d = S().length), (a = P().length), h.forEach((t) => t.update?.());
      }
      function b() {
        const e = z.barPosition.x,
          n = z.barPosition.y,
          o = r.clientWidth + 18,
          i = r.clientHeight + 2,
          a = t.innerWidth - e - o,
          c = t.innerHeight / 2 > n + i;
        a < 240
          ? r.classList.add("right-side")
          : r.classList.remove("right-side"),
          c
            ? r.classList.add("bottom-side")
            : r.classList.remove("bottom-side");
      }
      function $() {
        l && (l(), (l = null)), pt(r) && (l = Wt(r, "barPosition", b));
      }
      return {
        tt() {
          r ||
            (!(function () {
              const t = h.reduce((t, e) => t + e.html(), "");
              (r = e.createElement("div")),
                (r.id = o),
                (r.innerHTML = `<div id="drag-handle"><hr><hr></div><div id="content" tabindex="0">${t}</div>`),
                e.body.appendChild(r),
                h.forEach((t) => (t.node = r.querySelector("#" + t.id))),
                m(),
                $(),
                mt(e.querySelector(`#${u}`)),
                mt(e.querySelector(`#${p}`));
            })(),
            r.addEventListener("contextmenu", it, !0),
            h.forEach(
              (t) => t.handler && t.node.addEventListener("tap", t.handler, !0)
            ),
            b());
        },
        st() {
          r &&
            (r.removeEventListener("contextmenu", it, !0),
            h.forEach(
              (t) =>
                t.handler && t.node.removeEventListener("tap", t.handler, !0)
            ),
            r.remove(),
            (r = null));
        },
        ct(t) {
          r?.appendChild(t);
        },
        l() {
          r && m();
        },
        ut() {
          $();
        },
        nt() {
          b();
        },
        get dt() {
          return o;
        },
        get ft() {
          return r?.contains(e.activeElement);
        },
        get rt() {
          return a;
        },
        get it() {
          return d;
        },
        get ht() {
          return d === a;
        },
      };
    })(),
    Et = (function () {
      const n = (() => {
          let n, o;
          const i = (() => {
              let e;
              const i = (t, n) => {
                  const o = ((t, n) => {
                    const o = e.at(t).checked;
                    t > n && ([t, n] = [n, t]);
                    for (let i = t; i <= n; i++)
                      if (e.at(i).checked !== o) return o;
                    return !o;
                  })(t, n);
                  t > n && ([t, n] = [n, t]);
                  for (let i = t; i <= n; i++) e.at(i).checked = o;
                  kt.l();
                },
                a = (t, n) => {
                  let o;
                  for (; (o = e.at(t)); ) {
                    if (o.checked) return o;
                    t += n;
                  }
                },
                c = (t) => Math.abs(t) < 10,
                s = (t) => (n ? a(t - 1, -1) : e.at(t - 1)),
                d = (t) =>
                  n ? a(t + 1, 1) || a(0, 1) : e.at(t + 1) || e.at(0),
                l = (t) => {
                  const n = e.at(t).getBoundingClientRect();
                  for (let o = t - 1; o >= 0; o--) {
                    const t = e.at(o),
                      i = t.getBoundingClientRect();
                    if (
                      i.width &&
                      i.height &&
                      n.top >= i.bottom &&
                      (c(i.left - n.left) ||
                        c(i.right - n.right) ||
                        i.left < n.left)
                    )
                      return t;
                  }
                  return s(t);
                },
                p = (t) => {
                  const n = e.at(t).getBoundingClientRect();
                  for (let o = t + 1; o < e.length; o++) {
                    const t = e.at(o),
                      i = t.getBoundingClientRect();
                    if (
                      i.width &&
                      i.height &&
                      i.top >= n.bottom &&
                      (c(i.left - n.left) ||
                        c(i.right - n.right) ||
                        i.right > n.right)
                    )
                      return t;
                  }
                  return d(t);
                },
                u = () =>
                  e.find((e) => {
                    return (
                      (n = e.getBoundingClientRect()).top >= bt._ &&
                      n.bottom <= t.innerHeight
                    );
                    var n;
                  }),
                f = (t, n, i = o) => {
                  e = [...P()];
                  const r = e.indexOf(t);
                  if (-1 !== r)
                    $t.j(n(r)),
                      i && (c = t) && ((c.checked = !c.checked), kt.l());
                  else {
                    const n = $t.B;
                    $t.j(
                      (n && n !== t && (a = n) && e.find((t) => t === a)) ||
                        u() ||
                        e.at(0)
                    );
                  }
                  var a, c;
                  e = null;
                },
                h = (t, n) => {
                  e = [...P()];
                  const a = e.at(n);
                  if (
                    a &&
                    ($t.j(a),
                    n
                      ? r && a.scrollIntoView({ block: "center" })
                      : a.scrollIntoView(!1),
                    o)
                  ) {
                    const n = e.indexOf(t);
                    -1 !== n && i(n, e.indexOf(a));
                  }
                  e = null;
                },
                m = {
                  Tab: (t) => f(t, o ? s : d, !1),
                  ArrowUp: (t) => f(t, l),
                  ArrowDown: (t) => f(t, p),
                  ArrowLeft: (t) => f(t, s),
                  ArrowRight: (t) => f(t, d),
                  Home: (t) => h(t, 0),
                  End: (t) => h(t, -1),
                };
              return { getHandler: (t) => m[t] };
            })(),
            a = (t) => {
              if ($t.X) return;
              const e = t.key;
              switch (
                ((n = ((t) => t.ctrlKey && !t.shiftKey && !t.altKey)(t)),
                (o = tt(t)),
                e)
              ) {
                case "a":
                  return void (n && (_t(t), kt.ht ? lt() : dt()));
                case "c":
                  return void (n && Z() && (_t(t), Dt()));
                case "v":
                  return void (n && K() && (_t(t), Rt()));
                case "x":
                  return void (n && Y() && (X() || W()) && (_t(t), St(!0)));
                case "Insert":
                  return void (n
                    ? Z() && (_t(t), Dt())
                    : o && K() && (_t(t), Rt()));
                case "Delete":
                  return void (
                    (X() || W()) &&
                    (!Y() && $t.J && (($t.B.checked = !0), $t.U(), kt.l()),
                    Y() && (_t(t), St(o)))
                  );
              }
              if (kt.ft) return;
              const r = i.getHandler(e);
              r && (it(t), r(t.target));
            };
          return (t) => {
            t
              ? e.addEventListener("keydown", a, true)
              : e.removeEventListener("keydown", a, true);
          };
        })(),
        o = [
          `#${kt.dt} { display: block; }`,
          `${h}, #index.ytd-playlist-video-renderer { display: flex; }`,
          `${h}:hover { background-color: var(--yt-spec-10-percent-layer); }`,
          `#${vt.dt} > #button { border-radius: 50%; background-color: cyan; }`,
          `#${vt.dt} > #button:hover { background-color: rgb(0, 204, 204); }`,
          `#${vt.dt} > #button > button:focus { border-radius: 50%; background-color: rgb(191, 255, 255); }`,
          "ytd-playlist-video-renderer { position: relative; }",
          "ytd-radio-renderer { pointer-events: none; }",
          "#content.ytd-playlist-video-renderer, #dismissible.ytd-video-renderer, #dismissible.ytd-rich-grid-media, #dismissible.ytd-grid-video-renderer, #dismissible.ytd-compact-video-renderer { pointer-events: none; }",
          "#menu.ytd-playlist-video-renderer, #menu.ytd-video-renderer, #menu.ytd-rich-grid-media, #menu.ytd-grid-video-renderer, #menu.ytd-compact-video-renderer, #menu.ytd-reel-shelf-renderer { pointer-events: none; opacity: 0; }",
          "#reorder.ytd-playlist-video-renderer, #mouseover-overlay.ytd-thumbnail, #hover-overlays.ytd-thumbnail { display: none; }",
          `#interaction.ytd-video-renderer > .yt-interaction, #interaction.ytd-grid-video-renderer > .yt-interaction, #interaction.ytd-compact-video-renderer > .yt-interaction { border-radius: ${k}; }`,
          "body { user-select: none; }",
        ];
      let i = !1;
      return (t = !i) => {
        z.blacklisted && (Kt("⚠️ An unknown error has occurred"), (t = !1)),
          "boolean" == typeof t &&
            t !== i &&
            ((i = t),
            o.forEach((e) => Bt.bt(t, e)),
            n(t),
            t
              ? (e
                  .querySelector("ytd-popup-container > tp-yt-iron-dropdown")
                  ?.close?.(),
                $t.F(),
                kt.tt(),
                wt.tt(),
                Xt.$t())
              : (Zt.st(), kt.l()));
      };
    })(),
    Tt = (function () {
      const t = {},
        n = h,
        o = `<${n}></${n}>`,
        i = (t = n) => {
          customElements.get(t) ||
            Polymer({
              is: t,
              _template: () => {
                const t = e.createElement("template");
                return (
                  (t.innerHTML = `<tp-yt-paper-checkbox id="${g}" class="${g}" on-tap="onTap" on-contextmenu="onContextMenu"></tp-yt-paper-checkbox>`),
                  t
                );
              },
              attached() {
                !O && kt.l();
              },
              detached() {
                !O && kt.l();
              },
              onTap(t) {
                $t.j(),
                  tt(t.detail.sourceEvent) &&
                    ((t = $t.B) => {
                      const e = $t.G,
                        n = [...P()];
                      let o = e ? n.indexOf(e) : 0,
                        i = n.indexOf(t);
                      -1 === o && (o = 0), o > i && ([o, i] = [i, o]);
                      for (let e = o; e <= i; e++) n[e].checked = t.checked;
                    })(t.target),
                  kt.l();
              },
              onContextMenu(t) {
                $t.j(), _t(t), gt.ot(t.clientX, t.clientY);
              },
            });
        },
        r = (t) => {
          const e = customElements.get(t)?.generatedFrom?._template;
          return "function" == typeof e ? e() : e;
        },
        a = (n, i) => {
          t[n] = i;
          const r = i.content?.lastElementChild;
          r && r.insertAdjacentHTML("afterend", o),
            ((t) => {
              const n = e.querySelectorAll(t);
              n.length &&
                (n.length,
                n.forEach((t) => t.insertAdjacentHTML("beforeend", o)));
            })(n);
        };
      return {
        tt(t) {
          i();
          const e = r(t);
          e
            ? a(t, e)
            : ht(t).then((e) => {
                const n = e.polymerController || e.inst;
                a(t, n?._template);
              });
        },
        st(e) {
          const n = r(e) || t[e];
          n && ((n.innerHTML = n.innerHTML.replace(o, "")), delete t[e]);
        },
        get yt() {
          return n;
        },
      };
    })(),
    It = (function () {
      const t = [
          "ytd-rich-grid-media",
          "ytd-rich-grid-slim-media",
          "ytd-video-renderer",
          "ytd-reel-item-renderer",
          "ytd-grid-video-renderer",
          "ytd-playlist-video-renderer",
          "ytd-compact-video-renderer",
        ],
        n = [],
        o = (t) => {
          n[t] && (Tt.st(t), delete n[t]);
        };
      return {
        tt() {
          t.forEach((t) =>
            customElements.whenDefined(t).then(() =>
              ((t) => {
                Tt.tt(t), n.push(t);
              })(t)
            )
          );
        },
        st() {
          n.forEach(o),
            (n.length = 0),
            e.querySelectorAll(h).forEach((t) => t.remove());
        },
      };
    })();
  function At() {
    const t = j(N());
    if (t && t.resolveCommand) {
      const e = bt.T.C;
      return t.resolveCommand(e), ct(), !z.preserveSelection;
    }
  }
  function zt() {
    const t = bt.T.V;
    return bt.p(t), ct(), !z.preserveSelection;
  }
  function Lt() {
    const t = bt.T.D;
    return bt.p(t), ct(), !0;
  }
  function Mt() {
    const t = bt.T.P;
    return bt.p(t), ct(), !0;
  }
  function Ct() {
    const t = bt.T.S;
    return bt.p(t), ct(), !0;
  }
  function Ot() {
    const t = G();
    if (t.length) {
      M = !0;
      const e = { addToPlaylistServiceEndpoint: { videoId: t[0] } };
      bt.u(e)?.ajaxPromise?.then((e) => {
        const n = e?.data?.contents?.find?.(
          (t) => t.addToPlaylistRenderer
        )?.addToPlaylistRenderer;
        if (n) {
          const e = n.actions?.find?.(
            (t) => t.addToPlaylistCreateRenderer
          )?.addToPlaylistCreateRenderer;
          if (e) {
            const n = e.serviceEndpoint?.createPlaylistServiceEndpoint;
            n && (n.videoIds = t);
          }
          const r = t.map((t) => ({ action: o, addedVideoId: t })),
            a = t.map((t) => ({ action: i, removedVideoId: t }));
          n.playlists?.forEach((e) => {
            const n = e.playlistAddToOptionRenderer;
            if (n) {
              t.length > 1 && (n.containsSelectedVideos = "NONE");
              const e = n.addToPlaylistServiceEndpoint?.playlistEditEndpoint;
              e && (e.actions = r);
              const o =
                n.removeFromPlaylistServiceEndpoint?.playlistEditEndpoint;
              o && (o.actions = a);
            }
          });
          const c = {
            openPopupAction: {
              popupType: "DIALOG",
              popup: { addToPlaylistRenderer: n },
            },
          };
          bt.m("yt-open-popup-action", [c, bt.v]);
        }
      });
    }
  }
  function Vt() {
    const t = e.querySelector("ytd-multi-page-menu-renderer");
    if (t) {
      const e = t.data?.header?.activeAccountHeaderRenderer,
        n =
          e?.channelHandle?.simpleText ||
          e?.email?.simpleText ||
          e?.accountName?.simpleText;
      return (
        n !== z.handle && ((z.handle = n), at("handle", n)),
        !z.blacklisted &&
          (function (t) {
            const e = [
              "@w-regner",
              "@trentoast",
              "@flashmemories",
              "@micheledaniele5571",
              "@kattanart",
              "@fairyslash",
              "@titoosky",
              "@joey2scoops",
              "@1palace",
              "@utlf",
              "@dmitrydmitriev",
              "@hipffwi4739",
              "@pockettubehq",
              "@toetar",
              "@jennis.strickpodcast",
            ];
            return (
              e.includes(t?.channelHandle?.simpleText?.toLowerCase()) ||
              e.includes(t?.email?.simpleText?.toLowerCase()) ||
              e.includes(t?.accountName?.simpleText?.toLowerCase())
            );
          })(e) &&
          ((z.blacklisted = !0), at("blacklisted", !0)),
        t
      );
    }
  }
  function Dt() {
    const t = G();
    t.length && ((V.t = t), wt.U("copy"));
  }
  function Rt(t) {
    wt.U("paste");
    const e = t || V.t,
      n = bt.T.N(e);
    bt.h(n).then(
      (n) => {
        bt.$(), t && (V.t = t), (z.counts.paste += e.length), ct();
      },
      (t) => Kt("👎   " + (t.args?.[1]?.message || L.messages.invalidData))
    );
  }
  function Pt() {
    St(!0);
  }
  function St(t) {
    z.noRemovalConfirmation ? Nt(t) : xt.ot().then((e) => e && Nt(t));
  }
  function Nt(t) {
    t && wt.U("cut"),
      (D()
        ? (function (t) {
            const e = S();
            t && (V.t = G(e)), e.length;
            for (let t = 0; t < e.length; t++) {
              const n = j(e[t]),
                o = n.data.menu.menuRenderer,
                i = [];
              let r,
                a = ft(o.topLevelButtons, [
                  "buttonRenderer",
                  "serviceEndpoint",
                  "feedbackEndpoint",
                ]);
              !a &&
                (a = ft(o.items, [
                  "menuServiceItemRenderer",
                  "serviceEndpoint",
                  "feedbackEndpoint",
                ])) &&
                ((r = n), i.push(a.actions[0])),
                i.push(a.actions[1]),
                t === e.length - 1 && i.push(a.actions[2]);
              const c = {
                feedbackEndpoint: {
                  feedbackToken: a.feedbackToken,
                  actions: i,
                },
              };
              bt.p(c, r);
            }
            return (z.counts.cut += e.length), ct(), !0;
          })(t)
        : W()
        ? (function (t) {
            const e = S();
            t && (V.t = G(e)), e.length;
            for (let t = 0; t < e.length; t++) {
              const n = e[t].parentElement?.parentElement,
                o = n?.data?.menu?.menuRenderer,
                i = ft(o?.items, [
                  "menuServiceItemRenderer",
                  "serviceEndpoint",
                  "likeEndpoint",
                ]);
              i && bt.p({ likeEndpoint: i }, n);
            }
            return (z.counts.cut += e.length), ct(), !0;
          })(t)
        : (function (t) {
            const e = bt.T.O(t);
            return bt.p(e), ct(), !0;
          })(t)) && lt();
  }
  function Yt() {
    const t = z.findDuplicatesBackwards ? [...P()].reverse() : P(),
      e = {};
    let n = !1;
    for (let o = 0; o < t.length; o++) {
      const i = t[o],
        r = j(i).data.videoId;
      r && ((e[r] = (e[r] || 0) + 1), e[r] > 1 && ((i.checked = !0), (n = !0)));
    }
    !n && Kt("👍   " + L.messages.noDuplicatesFound), kt.l();
  }
  const Ht = (function () {
    const t = s + "-choose-format-" + c,
      n = !0;
    let o, i, r;
    const a = () =>
        +o?.querySelector(
          "section > label > input[type=radio][name=type]:checked"
        )?.value,
      d = (t) => {
        e.removeEventListener("keydown", r, n), o.close(t), i(t), (i = null);
      },
      l = () => {
        if (!o) {
          (o = e.createElement("dialog")),
            (o.id = t),
            (o.className = m),
            (o.innerHTML = (() => {
              const t = L.messages;
              return `<form method="dialog"><header></header><section><label><input type="radio" name="type" value="0" checked>JSON</label><label><input type="radio" name="type" value="1">TEXT</label><label><input type="radio" name="type" value="2">HTML</label></section><footer><button id="cancel">${
                t.cancel
              }</button><button id="submit">${
                t.save || "Speichern"
              }</button></footer></form>`;
            })());
          const n = o.querySelector("button#cancel"),
            i = o.querySelector("button#submit");
          n.addEventListener("tap", (t) => d(-1)),
            i.addEventListener("tap", (t) => d(a())),
            (r = (t) => {
              switch ((t.key, t.key)) {
                case "Escape":
                  d(-1);
                  break;
                case " ":
                case "Enter":
                  d(t.target === i ? a() : -1);
                  break;
                case "Tab":
                case "ArrowLeft":
                case "ArrowRight":
                  t.target === n ? i.focus() : n.focus();
              }
              it(t);
            }),
            e.body.appendChild(o);
        }
      };
    return {
      ot() {
        if (!o?.open)
          return (
            !o && l(),
            (o.querySelector("header").textContent =
              L.messages.chooseOutputFormat),
            e.addEventListener("keydown", r, n),
            o.showModal(),
            new Promise((t) => (i = t))
          );
      },
      st() {
        o && (e.removeEventListener("keydown", r, n), o.remove(), (o = null));
      },
      get dt() {
        return t;
      },
    };
  })();
  function jt() {
    function o(t) {
      switch (t) {
        case 0:
          return JSON.stringify(G());
        case 1:
          return G().join("\n");
        case 2:
          return [...S()]
            .map((t) => {
              const e = t.parentElement?.parentElement,
                o = e?.polymerController || e?.inst || e,
                i = o?.__data?.data,
                r = i?.thumbnail?.thumbnails?.[0]?.url,
                a =
                  i?.headline?.simpleText ||
                  i?.title?.simpleText ||
                  i?.title?.runs?.[0]?.text;
              return `<a href="${n}/watch?v=${i?.videoId}" style="display:block"><img src="${r}" style="width:150px">${a}</a>`;
            })
            .join("\n");
      }
    }
    Ht.ot().then((n) => {
      const i = A[n];
      if (i) {
        const r = o(n),
          a = new Blob([r], { type: i }),
          c = URL.createObjectURL(a),
          s = e.createElement("a");
        (s.href = c),
          (s.download = "youtube-links"),
          e.body.appendChild(s),
          s.click(),
          setTimeout(() => s.remove(), t.URL.revokeObjectURL(c));
      }
    });
  }
  function Ft() {
    const t = e.createElement("input");
    (t.type = "file"),
      (t.accept = A.toString()),
      (t.onchange = (e) => {
        const n = e.target?.files?.[0];
        n &&
          (function (t) {
            if (t) {
              const e = new FileReader();
              (e.onload = (e) => {
                try {
                  function n(t, e) {
                    switch (t) {
                      case "application/json":
                        return JSON.parse(e);
                      case "text/plain":
                        return e.replaceAll("\r\n", "\n").split("\n");
                      case "text/html":
                        return [...e.matchAll(/\/watch\?v=([^"]+)"/g)].map(
                          (t) => t[1]
                        );
                    }
                  }
                  const o = n(t.type, e.target.result);
                  if (
                    !Array.isArray(o) ||
                    o.some((t) => "string" != typeof t || t.length > 11)
                  )
                    throw new Error();
                  Rt(o);
                } catch (i) {
                  Kt("👎   " + L.messages.invalidData);
                }
              }),
                e.readAsText(t);
            }
          })(n),
          setTimeout(() => t.remove());
      }),
      e.body.appendChild(t),
      t.click();
  }
  const policy = window.trustedTypes.createPolicy('default', {
    createHTML: (string) => string
  });
  const Ut = r
      ? (function () {
          function t(t) {
            te();
          }
          const n = s + "-disable-extension-detector";
          return {
            create() {
              if (e.body) {
                const o = Bt.style;
                if (o && !e.getElementById(n)) {
                  const i = e.createElement("div");
                  (i.id = n),
                    e.body.appendChild(i),
                    i.addEventListener("transitionrun", t),
                    o.sheet.insertRule(
                      `#${n} { position: absolute; height: 0; width: 0; color: black; transition: color 1ms; }`
                    );
                }
              }
            },
            remove() {
              const o = e.getElementById(n);
              o && (o.removeEventListener("transitionrun", t), o.remove());
            },
          };
        })()
      : null,
    Bt = (function () {
      const t = `${s}-${c}-polymer`;
      let n;
      return {
        gt: () => (
          n ||
            ((n = e.createElement("style")),
            (n.id = t),
            e.head.appendChild(n),
            Ut?.create()),
          n
        ),
        xt() {
          n && (Ut?.remove(), n.remove(), (n = null));
        },
        vt() {
          if (n) {
            const t = 600,
              e = "24px",
              o = `0px 0px 10px 5px ${_}`,
              i = `var(--${s}-popup-layer)`,
              r = "var(--paper-listbox-color, var(--primary-text-color))",
              a = "var(--yt-spec-10-percent-layer)",
              d = `1px solid ${a}`,
              l = 4,
              b = Zt.dt,
              g = b + "-close",
              v = vt.dt,
              w = kt.dt,
              A = s + "-heartbeat-" + c,
              z = s + "-penalty-" + c,
              L = 40,
              M = 52,
              C = M / 2,
              O = [
                `html { --${s}-spec-20-percent-layer: rgba(0, 0, 0, 0.2); --${s}-popup-layer: rgb(247, 247, 247); }`,
                `html[dark] { --${s}-spec-20-percent-layer: rgba(255, 255, 255, 0.2); --${s}-popup-layer: rgb(40, 40, 40); }`,
                `@keyframes ${A} { 0%, 50% { transform: scale(1); } 25% { transform: scale(2); } }`,
                `#${u} { color: red; pointer-events: none; animation: ${A} linear 1s infinite; }`,
                `@keyframes ${z} { 0%, 50% { transform: scale(1); } 25% { transform: scale(4); } }`,
                `#${f} { font-size: 64px; position: fixed; top: 50vh; left: 50vw; z-index: 10000; pointer-events: none; animation: ${z} linear 1s infinite; }`,
                `#${p}:hover + #${u} { animation-duration: 0.4s; }`,
                `#${p} > button { background-color: #ffc24c; color: black; font-size: 16px; font-weight: 700; height: 35px; padding: 0px 20px; border-radius: 26px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; text-decoration-line: none; }`,
                `#${p} > button:hover { box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.9); }`,
                `.${m} { font-size: 14px; border-radius: ${k}; border: ${d}; box-shadow: ${o}; background-color: ${i}; color: ${r}; padding: 0; user-select: none; }`,
                `.${m} > form > header { margin: 24px; font-size: 16px; letter-spacing: 0.1px; }`,
                `.${m} > form > section { margin: 24px; color: var(--yt-spec-text-secondary, #aaa); letter-spacing: 0.2px; }`,
                `.${m} > form > footer { display: flex; justify-content: flex-end; padding: 10px 24px; border-top: ${d}; }`,
                `.${m} > form > footer > button { display: flex; align-items: center; justify-content: center; background-color: transparent; padding: 0 14px; height: 36px; line-height: 36px; outline: none; border-color: transparent; border-style: solid; border-radius: 18px; font-family: inherit; font-size: inherit; font-weight: 500; cursor: pointer; }`,
                `.${m} > form > footer > button#cancel { color: var(--yt-spec-text-primary); }`,
                `.${m} > form > footer > button#cancel:hover { background-color: ${a}; }`,
                `.${m} > form > footer > button#cancel:focus:not(:hover) { border-color: var(--yt-spec-text-primary); }`,
                `.${m} > form > footer > button#submit { color: var(--yt-spec-call-to-action, #3ea6ff); }`,
                `.${m} > form > footer > button#submit:hover { background-color: var(--yt-spec-suggested-action, #263850); }`,
                `.${m} > form > footer > button#submit:focus:not(:hover) { border-color: var(--yt-spec-call-to-action, #3ea6ff); }`,
                `.${m}::backdrop { background: rgba(0, 0, 0, 0.3); opacity 0.3; transition: opacity 0.2s; }`,
                `#${xt.dt}:not([open]) { display: none; }`,
                `#${Ht.dt}:not([open]) { display: none; }`,
                `#${Ht.dt} > form > section { display: flex; justify-content: space-between; }`,
                `#${Ht.dt} > form > section > label { display: flex; align-items: center; cursor: pointer; }`,
                `#${Ht.dt} > form > section > label > input { margin: 0 7px 0 0; cursor: pointer; }`,
                `#${v} { position: relative; display: flex; align-items: center; justify-content: center; margin-right: 8px; color: ${r}; }`,
                `#${v} > #button { width: ${L}px; height: ${L}px; }`,
                `#${v} > #button:hover { border-radius: 50%; background-color: ${a}; }`,
                `@keyframes ${
                  T + "-fade-out"
                } { from { opacity: 1; } to { opacity: 0; } }`,
                `#${T} { min-width: 200px; border-radius: ${k}; border: ${d}; padding: 12px; box-shadow: ${o}; background-color: ${i}; color: ${r}; position: fixed; top: 60px; left: 50vw; transform: translateX(-50%); font-size: 16px; z-index: 10000; }`,
                `#${T} > header { display: flex; align-items: center; padding-bottom: 8px; }`,
                `#${T} > header > #${I} { --yt-icon-button-icon-width: ${e}; --yt-icon-button-icon-height: ${e}; width: ${L}px; height: ${L}px; margin-left: 20px; }`,
                `#${T} > header > #${I}:hover { background-color: ${a}; border-radius: 50%; }`,
                `#${T} > div { padding: 8px 0; background-color: limegreen; color: #fff; text-align: center; }`,
                `@keyframes ${
                  E + "-fade-in-out"
                } { 0%, 100% { bottom: 100px; opacity: 0; } 20%, 80% { bottom: 130px; opacity: 1; } }`,
                `#${E} { font-size: 18px; position: fixed; bottom: 130px; left: 50vw; transform: translateX(-50%); z-index: 10000; box-shadow: ${o}; background-color: ${i}; color: ${r}; text-align: center; white-space: pre; border-radius: ${k}; border: ${d}; padding: 15px 20px; }`,
                `#${E}.show { animation: ${E + "-fade-in-out"} 4000ms; }`,
                `#${b} { padding: 0 20px 15px; opacity: 0.9; font-size: 16px; position: fixed; z-index: 2029; box-shadow: ${o}; background-color: ${i}; color: ${r}; text-align: center; border-radius: ${k}; border: ${d}; }`,
                `#${b}[position=center] { bottom: 130px; left: 50vw; transform: translateX(-50%); }`,
                `#${b}[position=left] { bottom: 130px; left: 50px; }`,
                `#${b}[position=custom] { left: clamp(0px, var(--x), calc(100vw - var(--right-offset))); top: clamp(1px, var(--y), calc(100vh - var(--bottom-offset))); }`,
                `#${b} > #drag-handle { visibility: hidden; position: relative; cursor: move; margin: 0 auto; padding: 4px 0; width: 50%; }`,
                `#${b} > #drag-handle > hr { border-style: inset; border-width: 1px; }`,
                `#${b} > #drag-handle > hr:first-child { margin: 0; }`,
                `#${b} > #drag-handle > hr:last-child { margin: 3px 0 0; }`,
                `#${b}[position=custom] > #drag-handle { visibility: visible; }`,
                `#${b} > #content > header { display: flex; align-items: center; }`,
                `#${b} > #content > header > #title { padding-left: 10px; padding-right: 5px; }`,
                `#${b} > #content > header > #${g} { margin-left: auto; }`,
                `#${b} > #content > #choice { display: flex; align-items: center; margin: 10px 0; }`,
                `#${b} > #content > #choice > #source-title { margin: 0; cursor: pointer; }`,
                `#${b} > #content > #choice > #source-channel { margin: 0 0 0 30px; cursor: pointer; }`,
                `#${b} > #content > #choice > #source-watched { margin: 0 0 0 30px; cursor: pointer; }`,
                `#${b} > #content > #choice > label { padding-left: 10px; cursor: pointer; }`,
                `#${b} > #content > section { display: flex; align-items: center; }`,
                `#${b} > #content > section > input { margin-right: 10px; width: 15em; border-radius: 6px; font-family: Courier; font-size: inherit; background-color: inherit; color: inherit; }`,
                `#${b} > #content > section > #done { margin-left: auto; }`,
                `#${b} > #content > footer { margin-top: 20px; }`,
                `#${b} > #content > footer > div { display: flex; align-items: center; }`,
                `#${b} > #content > footer > div > input { cursor: pointer; transform: scale(1.5); }`,
                `#${b} > #content > footer > div > label { cursor: pointer; padding-left: 10px; }`,
                `#${b} > #content yt-icon-button { --yt-icon-button-icon-width: ${e}; --yt-icon-button-icon-height: ${e}; width: ${L}px; height: ${L}px; }`,
                `#${b} > #content yt-icon-button:hover { background-color: ${a}; border-radius: 50%; }`,
                `#${w} { display: none; position: fixed; padding: 0 20px 15px; border-radius: ${k}; border: ${d}; box-shadow: ${o}; background-color: ${i}; color: ${r}; opacity: 0.9; font-size: 16px; max-width: ${t}px; z-index: 2030; }`,
                `#${w}[position=center] { bottom: 30px; left: 50vw; transform: translateX(-50%); }`,
                `#${w}[position=left] { bottom: 30px; left: 50px; }`,
                `#${w}[position=custom] { left: clamp(0px, var(--x), calc(100vw - var(--right-offset))); top: clamp(1px, var(--y), calc(100vh - var(--bottom-offset))); }`,
                `#${w} > #drag-handle { visibility: hidden; position: relative; cursor: move; margin: 0 auto; padding: 4px 0; width: 50%; }`,
                `#${w} > #drag-handle > hr { border-style: inset; border-width: 1px; }`,
                `#${w} > #drag-handle > hr:first-child { margin: 0; }`,
                `#${w} > #drag-handle > hr:last-child { margin: 3px 0 0; }`,
                `#${w}[position=custom] > #drag-handle { visibility: visible; }`,
                `#${w} > #content { display: flex; align-items: center; column-gap: 10px; }`,
                `#${w} > #content > #selection { width: 100px; text-align: end; pointer-events: none; }`,
                `#${w} > #content > span { pointer-events: none; }`,
                `#${w} > #content > yt-icon-button { --yt-icon-button-icon-width: ${e}; --yt-icon-button-icon-height: ${e}; width: ${L}px; height: ${L}px; }`,
                `#${w} > #content > yt-icon-button:hover { background-color: ${a}; border-radius: 50%; }`,
                `#${w} > #content > yt-icon-button[disabled] { pointer-events: none; cursor: auto; color: var(--paper-icon-button-disabled-text, var(--disabled-text-color)); }`,
                `.${s}-bar-menu { position: relative; }`,
                `.${s}-bar-menu > #listbox { position: absolute; left: calc(100% - 50px); bottom: calc(100% + 42px); max-height: calc(100vh - 160px); overflow: auto; }`,
                `#${w}.right-side > .${s}-bar-menu > #listbox { left: auto; right: 0; }`,
                `#${w}.bottom-side > .${s}-bar-menu > #listbox { bottom: auto; }`,
                `.${s}-context-menu { position: absolute; z-index: 2030; transform: translateX(clamp(5vw, var(--x), calc(100vw - 100% - 40px))) translateY(clamp(5vh, var(--y), calc(100vh - 100% - 30px + var(--scroll-y)))); }`,
                `.${s}-context-menu > #listbox { max-height: calc(100vh - 100px); overflow: auto; }`,
                `#listbox.${$} { border-radius: ${k}; border: ${d}; padding: 8px 0px; white-space: nowrap; box-shadow: ${o}; background-color: ${i}; color: ${r}; }`,
                `.${y} > div { cursor: pointer; min-height: 36px; padding: 0 36px 0 16px; font-size: 14px; display: flex; align-items: center; }`,
                `.${y} > div:focus { background-color: ${a}; outline: 0; }`,
                `.${y} > div:hover { background-color: ${a}; }`,
                `.${y} > div:hover:focus { background-color: var(--${s}-spec-20-percent-layer); }`,
                `.${y} > div > yt-icon { pointer-events: none; margin-right: 16px; color: var(--yt-spec-icon-inactive); }`,
                `.${y}[separator="top"]::before, .${y}[separator="bottom"]::after { content: ""; display: block; height: 1px; background-color: ${a}; margin: 8px 0; }`,
                `@keyframes ${wt.dt} { from { opacity: 1; } to { opacity: 0; transform: scale(2); } }`,
                `#${wt.dt} { background: ${_}; animation: ${wt.dt} 0.5s linear forwards; position: fixed; left: 50%; top: 50%; width: ${M}px; height: ${M}px; margin-left: -${C}px; margin-top: -${C}px; border-radius: ${C}px; z-index: 2030; pointer-events: none; display: none; }`,
                `#${wt.dt} #icon { width: 40px; height: 40px; margin: 6px; display: flex; align-items: center; justify-content: center; }`,
                `${x} { --paper-checkbox-size: 40px; --paper-checkbox-ink-size: 40px; border-radius: ${k}; width: 100%; height: 100%; display: flex; align-items: end; justify-content: end; }`,
                `${x} > #checkboxContainer { border-bottom-right-radius: ${k}; }`,
                `${x} > #checkboxContainer > #checkbox { border-bottom-right-radius: ${k}; transition: none; }`,
                `${x} > #checkboxContainer > #checkbox > #checkmark { animation: checkmark-expand 40ms ease-out forwards; }`,
                `${x} > #checkboxLabel { display: none; }`,
                `${x}:not([checked]) > #checkboxContainer { display: none; }`,
                `${x}[checked] { background-color: rgba(62, 166, 255, 0.4); }`,
                `${x}:focus { outline: cyan solid ${l}px; outline-offset: -${l}px }`,
                `${h} { border-radius: ${k}; position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 1; cursor: pointer; display: none; }`,
                `ytd-grid-video-renderer[is-dismissed] > ${h}, ytd-video-renderer[is-hidden] > ${h}, ytd-video-renderer[is-dismissed] > ${h}, ytd-compact-video-renderer[is-dismissed] > ${h}, ytd-reel-item-renderer[is-dismissed] > ${h} { display: none; }`,
              ],
              V = n.sheet,
              D = V.cssRules.length;
            O.forEach((t, e) => V.insertRule(t, D + e));
          }
        },
        bt(t, e) {
          if (n) {
            const o = n.sheet,
              i = o.cssRules,
              r = e,
              a = [...i].findIndex((t) => t.cssText === r);
            t
              ? -1 === a && o.insertRule(r, i.length)
              : -1 !== a && o.deleteRule(a);
          }
        },
        get style() {
          return n;
        },
      };
    })(),
    Gt = (function () {
      let t;
      return {
        gt() {
          if (!t) {
            (t = e.createElement("iron-iconset-svg")),
              t.setAttribute("name", s),
              t.setAttribute("size", "24"),
              (t.style.display = "none");
            const n = `<g id="${s}-heart"><path d="M16.5 2c-1.74 0-3.41.88-4.5 2.28C10.91 2.88 9.24 2 7.5 2 4.42 2 2 4.64 2 7.99c0 4.12 3.4 7.48 8.55 12.58L12 22l1.45-1.44C18.6 15.47 22 12.11 22 7.99 22 4.64 19.58 2 16.5 2Z"></path></g>`,
              o = `<g id="${s}-help"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></g>`,
              i = `<g id="${s}-info"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></g>`,
              r = `<g id="${s}-select-all"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path></g>`,
              a = `<g id="${s}-unselect-all"><path d="M1.79 12l5.58 5.59L5.96 19 .37 13.41 1.79 12zm.45-7.78L12.9 14.89l-1.28 1.28L7.44 12l-1.41 1.41L11.62 19l2.69-2.69 4.89 4.89 1.41-1.41L3.65 2.81 2.24 4.22zm14.9 9.27L23.62 7 22.2 5.59l-6.48 6.48 1.42 1.42zM17.96 7l-1.41-1.41-3.65 3.66 1.41 1.41L17.96 7z"></path></g>`;
            (t.innerHTML = policy.createHTML(`<svg><defs>${n}${o}${i}${r}${a}</defs></svg>`)),
              e.head.appendChild(t);
          }
        },
        xt() {
          t && (t.remove(), (t = null));
        },
      };
    })(),
    qt = (function () {
      let t;
      const n = (function () {
          let e;
          const n = (t) => e.indexOf(t.playlistId),
            o = (t, e) =>
              (t.title?.simpleText || "").localeCompare(e.title?.simpleText),
            i = (t, e) => n(t) - n(e);
          return (n, r) => {
            n &&
              (t
                ? ((e = n.map((t) => t.playlistAddToOptionRenderer.playlistId)),
                  n.sort((t, e) =>
                    o(
                      t.playlistAddToOptionRenderer,
                      e.playlistAddToOptionRenderer
                    )
                  ),
                  r &&
                    [...r.children]
                      .sort((t, e) => o(t.data, e.data))
                      .forEach((t) => r.appendChild(t)))
                : e &&
                  (n.sort((t, e) =>
                    i(
                      t.playlistAddToOptionRenderer,
                      e.playlistAddToOptionRenderer
                    )
                  ),
                  r &&
                    [...r.children]
                      .sort((t, e) => i(t.data, e.data))
                      .forEach((t) => r.appendChild(t)),
                  (e = null)));
          };
        })(),
        o = (function () {
          let e;
          const n = (t) => e.indexOf(t.entryData.guideEntryData.guideEntryId),
            o = (t, e) =>
              (t.formattedTitle?.simpleText || "").localeCompare(
                e.formattedTitle?.simpleText
              ),
            i = (t, e) => n(t) - n(e);
          return (n) => {
            const r = n.data?.expandableItems;
            if (r) {
              const a = n.expandableItems;
              t
                ? ((e = r.map(
                    (t) =>
                      t.guideEntryRenderer.entryData.guideEntryData.guideEntryId
                  )),
                  r.sort((t, e) =>
                    o(t.guideEntryRenderer, e.guideEntryRenderer)
                  ),
                  a &&
                    [...a.children]
                      .sort((t, e) => o(t.data, e.data))
                      .forEach((t) => a.appendChild(t)))
                : e &&
                  (r.sort((t, e) =>
                    i(t.guideEntryRenderer, e.guideEntryRenderer)
                  ),
                  a &&
                    [...a.children]
                      .sort((t, e) => i(t.data, e.data))
                      .forEach((t) => a.appendChild(t)),
                  (e = null));
            }
          };
        })();
      return {
        updateDialog: n,
        get enabled() {
          return t;
        },
        set enabled(i) {
          (t = i),
            ht(
              "ytd-guide-collapsible-entry-renderer",
              "ytd-app tp-yt-app-drawer"
            ).then(o);
          const r = e.querySelector(
            "ytd-add-to-playlist-renderer.ytd-popup-container"
          );
          r?.parentElement?.__data?.opened && n(r.data?.playlists, r.playlists);
        },
      };
    })(),
    Qt = (() => {
      const t = {
        showVideoIndex: `${b} ytd-playlist-video-renderer[can-reorder][is-editable]:hover #index.ytd-playlist-video-renderer, ${b} ytd-playlist-video-renderer[persistent-drag-handle] #index.ytd-playlist-video-renderer, ytd-app > ytd-playlist-video-renderer.dragging[can-reorder][is-editable]:hover #index.ytd-playlist-video-renderer { display: flex; }`,
      };
      return (e) => {
        for (const n in e) {
          const o = e[n],
            i = t[n];
          if (i)
            "string" == typeof i ? Bt.bt(o, i) : i.forEach((t) => Bt.bt(o, t));
          else if (z.hasOwnProperty(n))
            switch (((z[n] = o), n)) {
              case "sortPlaylistNames":
                qt.enabled = o;
                break;
              case "positioning":
                kt.ut(), Zt.ut();
            }
        }
      };
    })(),
    Jt = (function () {
      const n = {
        "yt-open-popup-action": function (t) {
          const e = t.detail?.args?.[0]?.openPopupAction;
          if ("DIALOG" === e?.popupType) {
            const t = e.popup?.addToPlaylistRenderer?.playlists;
            t && qt.updateDialog(t);
          }
        },
      };
      const a = [
          {
            type: l,
            listener: function (t) {
              try {
                const { type: n, value: o } = JSON.parse(t.detail);
                switch (n) {
                  case "options-changed":
                    gt.et(),
                      Qt(o),
                      Xt.$t(),
                      z.loaded ||
                        ((z.loaded = !0),
                        bt.k &&
                          (function () {
                            if (!Vt()) {
                              const t = bt.T.Y;
                              bt.h(t).then((t) => {
                                const e = Vt(),
                                  n = e?.parentElement?.parentElement;
                                n && n.opened && n.close();
                              });
                            }
                          })());
                    break;
                  case "command":
                    "toggleMultiSelectMode" === o
                      ? Et()
                      : "togglePlaylistGuide" === o &&
                        ((t) => {
                          const n = e.querySelector(
                            "ytd-guide-collapsible-entry-renderer.ytd-guide-collapsible-section-entry-renderer"
                          );
                          n &&
                            (n.hasAttribute("expanded")
                              ? n.onCollapserItemTapped(t)
                              : n.onExpanderItemTapped(t));
                        })({ preventDefault() {} });
                    break;
                  case "data":
                    (L = o), vt.tt();
                    break;
                  case "destroy":
                    te(),
                      (qt.enabled = !1),
                      !r &&
                        (function () {
                          const t = s + "-reload-required";
                          if (!e.querySelector(`#${t}`))
                            try {
                              const n = [
                                  `@keyframes ${t}-pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } }`,
                                  `#${t} { top: 15px; left: 20px; padding: 12px; font-size: 15px; position: fixed; display: flex; align-items: center; color: var(--yt-spec-text-primary); background-color: var(--yt-spec-menu-background); border-radius: 12px; box-shadow: ${"0px 0px 10px 5px rgba(255, 0, 0, 0.5)"}; z-index: 10000; animation: ${t}-pulse linear 2s infinite; user-select: none; cursor: pointer; }`,
                                  `#${t} > #info { margin: 0 10px; }`,
                                  `#${t}[dir="rtl"] { left: auto; right: 25px; }`,
                                ],
                                o = Bt.gt().sheet,
                                i = o.cssRules.length;
                              n.forEach((t, e) => o.insertRule(t, i + e));
                              const r = L.messages,
                                a = e.createElement("div");
                              (a.id = t),
                                (a.dir = r.localeDir),
                                (a.title = r.clickToClose),
                                (a.onclick = () => (a.style.display = "none")),
                                (a.innerHTML = `${ot(
                                  !1,
                                  48
                                )}<div id="info"><p>${r.extensionName}</p>${
                                  r.reloadRequired
                                }</div>`),
                                e.body.appendChild(a);
                            } catch (t) {}
                        })();
                }
              } catch (t) {}
            },
            capture: !0,
          },
          {
            type: "yt-navigate-start",
            listener: function (t) {
              gt.et(), lt(), $t.H();
            },
          },
          {
            type: "yt-navigate-finish",
            listener: function (t) {
              lt(), $t.H(), kt.l(), xt.st();
            },
          },
          {
            type: "yt-action",
            listener: function (t) {
              const e = t.detail?.actionName;
              e && n[e]?.(t);
            },
          },
          {
            type: "yt-popup-closed",
            listener: function (t) {
              M &&
                "YTD-ADD-TO-PLAYLIST-RENDERER" ===
                  t.detail?.popupRenderer?.nodeName &&
                (!z.preserveSelection && lt(), (M = !1), (C = null));
            },
          },
          {
            type: "yt-service-request-sent",
            listener: function (t) {
              M && (C = t.detail?.actions?.[0]?.action);
            },
          },
          {
            type: "yt-service-request-completed",
            listener: function (t) {
              if (M) {
                const n = t.detail?.data;
                if (n)
                  if (C === o) {
                    const t = n.playlistEditResults;
                    t && ((z.counts.copy += t.length), ct());
                  } else if (C === i) {
                    const t = n.actions;
                    if (t && "TOAST" === t?.[0]?.openPopupAction?.popupType) {
                      (z.counts.cut += t.length), ct();
                      const n = e.querySelectorAll(
                          "yt-notification-action-renderer"
                        ),
                        o = n[0]?.toastManager;
                      if (o) {
                        const t = o.currentToast;
                        t &&
                          ((o.queue = []),
                          setTimeout(
                            () => n.forEach((t) => t.remove()),
                            t.duration || 4e3
                          ));
                      }
                    }
                  }
              }
            },
          },
          {
            type: "yt-service-request-error",
            listener: function (t) {
              if (
                M &&
                "YTD-PLAYLIST-ADD-TO-OPTION-RENDERER" ===
                  t.detail?.params?.[0]?.nodeName
              ) {
                Kt(
                  "👎   " +
                    (t.detail.error?.args?.[1]?.message ||
                      "Maximum playlist size exceeded.")
                );
              }
            },
          },
        ],
        c = ({ type: n, listener: o, capture: i }) =>
          (i ? t : e).addEventListener(n, o, i),
        d = ({ type: n, listener: o, capture: i }) =>
          (i ? t : e).removeEventListener(n, o, i);
      return { wt: () => a.forEach(c), xt: () => a.forEach(d) };
    })(),
    Xt = (() => {
      let n, o, i;
      const c = s + "-callout",
        d = 150,
        l = 10,
        u = 12,
        f = (t) => {
          const e = t.querySelector(i.child),
            n = ((t, e) => {
              const n = t.getBoundingClientRect(),
                o = e.getBoundingClientRect(),
                i = o.top - n.top,
                r = o.left - n.left - d / 2 - l + o.width / 2;
              return { top: i, left: r };
            })(t, e);
          return `bottom: ${t.clientHeight + u - n.top}px; left: ${n.left}px;`;
        },
        h = "#" + kt.dt,
        m = [
          {
            parent: "#" + vt.dt,
            dir: "up",
            content: () =>
              `${L.messages.callout1} <button id="shortcuts">${L.messages.keys}</button>`,
            style: (t) => `top: ${t.clientHeight + u}px;`,
            callback: () => {
              const t = r
                ? "https://mzl.la/3Qwp5QQ"
                : (a ? "edge" : "chrome") + "://extensions/shortcuts";
              n.querySelector("#shortcuts").addEventListener("click", () =>
                at("url", t)
              );
            },
          },
          {
            parent: h,
            dir: "down",
            content: () => L.messages.callout2,
            style: (t) =>
              `bottom: ${t.clientHeight + u}px; left: ${
                t.clientWidth / 2 - d / 2 - l
              }px;`,
          },
          {
            parent: h,
            dir: "down",
            content: () => L.messages.callout3,
            style: f,
            child: `#${s}-close`,
          },
          {
            parent: h,
            dir: "down",
            content: () => L.messages.callout4,
            style: f,
            child: "#" + p,
          },
          {
            parent: h,
            dir: "down",
            content: () => L.messages.callout5,
            style: f,
            child: "#selection",
          },
          {
            parent: h,
            dir: "down",
            content: () => L.messages.callout6,
            style: f,
            child: "#select",
          },
          {
            parent: h,
            dir: "down",
            content: () => L.messages.callout7,
            style: f,
            child: "#unselect",
          },
          {
            parent: h,
            dir: "down",
            content: () => L.messages.callout8,
            style: f,
            child: "#menu",
          },
        ],
        b = () => {
          z.callout < m.length &&
            ((n.style.display = "none"), at("callout", z.callout + 1));
        };
      function $(r) {
        if ("none" !== t.getComputedStyle(r).display) {
          if (i.child) {
            const e = r.querySelector(i.child);
            if (!("none" !== t.getComputedStyle(e).display)) return void b();
          }
          z.callout,
            (function () {
              if (!n) {
                const t = "cyan";
                [
                  `@keyframes ${c}-up { 0% { transform: translateY(0px); } 50% { transform: translateY(${u}px); } }`,
                  `@keyframes ${c}-down { 0% { transform: translateY(0px); } 50% { transform: translateY(-${u}px); } }`,
                  `#${c} { position: absolute; border-radius: ${k}; width: ${d}px; padding: ${l}px; background-color: ${t}; box-shadow: 0px 0px 10px 5px ${_}; color: black; display:flex; justify-content: center; font-size: 14px; z-index: 2030; user-select: none; }`,
                  `#${c}::after { position: absolute; border-width: ${u}px; border-color: transparent; border-style: solid; pointer-events: none; content: " "; }`,
                  `#${c}[dir=up]::after { top: -${
                    2 * u
                  }px; border-bottom-color: ${t}; animation: ${c}-up linear 1.2s infinite; }`,
                  `#${c}[dir=down]::after { bottom: -${
                    2 * u
                  }px; border-top-color: ${t}; animation: ${c}-down linear 1.2s infinite; }`,
                  `#${c} > div > #close { top: ${l + 2}px; right: ${
                    l + 2
                  }px; position: absolute; font-size: 30px; line-height: 16px; cursor: pointer; }`,
                  `#${c} > div > #close:hover { color: red; }`,
                  `#${c} > div > #content { padding: 5px; }`,
                  `#${c} > div > #content > button { cursor: pointer; }`,
                ].forEach((t) => Bt.bt(!0, t)),
                  (n = e.createElement("div")),
                  (n.id = c),
                  (n.innerHTML = `<div><yt-icon id="icon" icon="${s}:${s}-info"></yt-icon><span id="close">×</span><div id="content"></div></div>`),
                  n
                    .querySelector("#close")
                    .addEventListener("click", (t) => (it(t), b())),
                  (o = n.querySelector("#content"));
              }
            })(),
            (o.innerHTML = i.content()),
            n.setAttribute("dir", i.dir),
            (n.style = i.style(r)),
            i.callback?.(),
            r.appendChild(n);
        }
      }
      return {
        $t() {
          (i = m[z.callout]), i && ht(i.parent).then($);
        },
        st() {
          n && (n.remove(), (n = null));
        },
      };
    })();
  function Wt(n, o, i) {
    if (n) {
      const r = n.querySelector("#drag-handle");
      if (r) {
        const a = z[o];
        let c, s, d, l;
        function p(e) {
          e.preventDefault();
          const o = Math.min(
              Math.max(n.offsetLeft + e.clientX - c, 0),
              t.innerWidth - d
            ),
            r = Math.min(
              Math.max(n.offsetTop + e.clientY - s, 1),
              t.innerHeight - l
            );
          (a.x = o),
            (a.y = r),
            i && i(),
            n.style.setProperty("--x", o + "px"),
            n.style.setProperty("--y", r + "px"),
            (c = e.clientX),
            (s = e.clientY);
        }
        function u(t) {
          t.preventDefault(),
            n.removeAttribute("dragging"),
            e.removeEventListener("mouseup", u, !0),
            e.removeEventListener("mousemove", p, !0),
            at(o, a);
        }
        function f(t) {
          t.preventDefault(),
            n.setAttribute("dragging", ""),
            (c = t.clientX),
            (s = t.clientY),
            e.addEventListener("mouseup", u, !0),
            e.addEventListener("mousemove", p, !0);
        }
        function h() {
          (d = n.clientWidth + 18),
            (l = n.clientHeight + 2),
            n.style.setProperty("--x", a.x + "px"),
            n.style.setProperty("--y", a.y + "px"),
            n.style.setProperty("--right-offset", d + "px"),
            n.style.setProperty("--bottom-offset", l + "px"),
            r.addEventListener("mousedown", f, !0);
        }
        function m() {
          r.removeEventListener("mousedown", f, !0),
            e.removeEventListener("mouseup", u, !0),
            e.removeEventListener("mousemove", p, !0),
            n.style.removeProperty("--x"),
            n.style.removeProperty("--y"),
            n.style.removeProperty("--right-offset"),
            n.style.removeProperty("--bottom-offset");
        }
        return h(), m;
      }
    }
  }
  const Zt = (function () {
    const n = s + "-select-filter",
      o = n + "-close",
      i = n + "-help",
      r = encodeURI(
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet"
      );
    let a, c;
    function d() {
      c && (c(), (c = null)), pt(a) && (c = Wt(a, "filterPosition"));
    }
    function l() {
      gt.et(), a.remove(), (a = null), kt.l();
    }
    function p() {
      if (!a) {
        (a = e.createElement("div")), (a.id = n);
        const c = et(o, "close") + nt(o, L.messages.close),
          p = et(i, `${s}:${s}-help`) + nt(i, L.messages.filterHelpTooltip),
          u = et("done", "icons:done"),
          f = `<header><yt-icon icon="icons:filter-list"></yt-icon>${`<span id="title">${L.messages.selectWithFilter}</span>`}${p}${c}</header>`,
          h = `<input type="radio" name="source" value="title" id="source-title" checked><label for="source-title">${L.messages.title}</label>`,
          m = `<input type="radio" name="source" value="shortBylineText" id="source-channel"><label for="source-channel">${L.messages.channelName}</label>`,
          b = `<input type="radio" name="source" value="watched" id="source-watched"><label for="source-watched">${L.messages.watched}</label>`,
          $ = `<section><input><output style="display: none; width: 3em; text-align: right;"><span></span> %</output>${u}</section>`,
          y = n + "-case-sensitive",
          g = `<footer>${`<div><input type="checkbox" id="${y}"><label for="${y}">${L.messages.caseSensitive}</label></div>`}</footer>`;
        (a.innerHTML = `<div id="drag-handle"><hr><hr></div><div id="content">${f}<div id="choice">${h}${m}${b}</div>${$}${g}</div>`),
          a
            .querySelector("#content > header > #" + i)
            .addEventListener("tap", () => t.open(r, "_blank")),
          a.querySelector("#" + o).addEventListener("tap", l);
        let x = z.filter.title;
        const v = a.querySelector("section > input"),
          w = v.nextElementSibling;
        v.addEventListener("input", (t) => {
          (x.value = v.value),
            "range" === v.type && (w.firstElementChild.innerHTML = x.value);
        });
        const _ = a.querySelector(`#${y}`);
        (_.checked = x.option),
          _.addEventListener("change", (t) => {
            x.option = _.checked;
          }),
          a.querySelector("#source-title").addEventListener("change", (t) => {
            (x = z.filter.title),
              (v.style.width = "15em"),
              v.removeAttribute("type"),
              v.removeAttribute("min"),
              v.removeAttribute("max"),
              (v.value = x.value),
              v.focus(),
              (w.style.display = "none"),
              (_.checked = x.option),
              (_.nextElementSibling.textContent = L.messages.caseSensitive);
          }),
          a.querySelector("#source-channel").addEventListener("change", (t) => {
            (x = z.filter.channel),
              (v.style.width = "15em"),
              v.removeAttribute("type"),
              v.removeAttribute("min"),
              v.removeAttribute("max"),
              (v.value = x.value),
              v.focus(),
              (w.style.display = "none"),
              (_.checked = x.option),
              (_.nextElementSibling.textContent = L.messages.caseSensitive);
          }),
          a.querySelector("#source-watched").addEventListener("change", (t) => {
            (x = z.filter.watched),
              (v.style.width = "12em"),
              v.setAttribute("type", "range"),
              v.setAttribute("min", "1"),
              v.setAttribute("max", "100"),
              (v.value = x.value),
              v.focus(),
              (w.style.display = "block"),
              (w.firstElementChild.innerHTML = x.value),
              (_.checked = x.option),
              (_.nextElementSibling.textContent = "Filter umkehren");
          });
        const k = () => a.querySelector('input[name="source"]:checked').value,
          E = () =>
            (function (t, e, n) {
              if (t)
                try {
                  const o = "watched" !== n ? new RegExp(t, e ? "i" : "") : t,
                    i = P();
                  for (let t = 0; t < i.length; t++) {
                    const r = i[t],
                      a = j(r).data;
                    if ("watched" === n) {
                      const t = a.thumbnailOverlays?.find(
                          (t) => t.thumbnailOverlayResumePlaybackRenderer
                        ),
                        n =
                          t?.thumbnailOverlayResumePlaybackRenderer
                            ?.percentDurationWatched;
                      (e ? n >= o : n < o) && (r.checked = !0);
                    } else {
                      const t =
                        a?.[n]?.runs?.map((t) => t.text).join("") ||
                        ("title" === n ? a?.headline?.simpleText : "");
                      o.test(t) && (r.checked = !0);
                    }
                  }
                  kt.l();
                } catch (t) {
                  t.message, Kt("👎   " + L.messages.invalidFilter);
                }
            })(v.value, !_.checked, k());
        v.addEventListener("keyup", (t) => "Enter" === t.key && E()),
          a
            .querySelector("#content > section > #done")
            .addEventListener("tap", E),
          e.body.appendChild(a),
          e.activeElement,
          d(),
          $t.j(v),
          kt.l();
      }
    }
    return {
      tt() {
        a || p();
      },
      st() {
        a && l();
      },
      U() {
        a && (a.style.display = "block");
      },
      _t() {
        a && (a.style.display = "none");
      },
      ut() {
        d();
      },
      get dt() {
        return n;
      },
      get lt() {
        return !!a;
      },
    };
  })();
  function Kt(t) {
    const n = e.createElement("div");
    (n.id = E),
      (n.textContent = t),
      (n.className = "show"),
      e.body.appendChild(n),
      n.addEventListener("animationend", function t(e) {
        n.removeEventListener("animationend", t), n.remove();
      });
  }
  function te() {
    (O = !0),
      e.querySelector("#" + T)?.remove(),
      Jt.xt(),
      Bt.xt(),
      Gt.xt(),
      It.st(),
      gt.et(),
      xt.st(),
      vt.st(),
      kt.st(),
      wt.st(),
      Zt.st(),
      Xt.st();
  }
  Bt.gt(), Bt.vt(), Gt.gt(), It.tt(), Jt.wt();
})(window, document);
