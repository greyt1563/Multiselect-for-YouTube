const e =
  ("undefined" != typeof chrome && chrome) ||
  ("undefined" != typeof browser && browser) ||
  void 0;
if (e) {
  const n = (n, i) => e.tabs.sendMessage(n, i),
    i = (e, i) => n(e, { type: "command", value: i }),
    o = () => e.tabs.query({ active: !0, lastFocusedWindow: !0 });
  e.action.disable(),
    e.runtime.onConnect.addListener((n) => {
      e.action.enable(n.sender.tab.id), n.sender.tab.id;
    }),
    e.runtime.onMessage.addListener((n) => {
      const { type: i, value: o } = n;
      if ("url" === i) e.tabs.create({ url: o, active: !0 });
    }),
    e.runtime.onInstalled.addListener((n) => {
      n.reason === e.runtime.OnInstalledReason.INSTALL
        ? (e.storage.local.set({ installed: Date.now() }),
          e.runtime.openOptionsPage())
        : n.reason === e.runtime.OnInstalledReason.UPDATE &&
          (n.previousVersion < "3.0"
            ? e.storage.local.remove([
                "hideOnHome",
                "hideOnTrending",
                "hideOnSubscriptions",
                "hideOnLibrary",
                "hideOnHistory",
                "hideOnChannel",
                "hideOnPlaylist",
                "hideOnWatch",
                "hideOnResults",
                "transparentBackgroundColor",
                "showOnHover",
              ])
            : n.previousVersion < "3.4" &&
              (e.storage.local.remove("blockAds"),
              e.storage.local.get("actionBarLeft").then((n) => {
                n.actionBarLeft &&
                  (e.storage.local.set({ positioning: "left" }),
                  e.storage.local.remove("actionBarLeft"));
              })),
          e.runtime.openOptionsPage());
    }),
    e.commands.onCommand.addListener((e, n) => {
      n
        ? n.id >= 0 && i(n.id, e).catch((e) => {})
        : o().then((n) => n[0] && i(n[0].id, e).catch((e) => {}));
    });
}
