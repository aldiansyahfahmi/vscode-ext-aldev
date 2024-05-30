export type LabelIcon =
  | "breadcrumb-separator"
  | "breadcrumb-separator~spin"
  | "dialog-close"
  | "dialog-close~spin"
  | "dialog-error"
  | "dialog-error~spin"
  | "dialog-info"
  | "dialog-info~spin"
  | "dialog-warning"
  | "dialog-warning~spin"
  | "diff-insert"
  | "diff-insert~spin"
  | "diff-remove"
  | "diff-remove~spin"
  | "diff-review-close"
  | "diff-review-close~spin"
  | "diff-review-insert"
  | "diff-review-insert~spin"
  | "diff-review-remove"
  | "diff-review-remove~spin"
  | "find-close"
  | "find-close~spin"
  | "find-collapsed"
  | "find-collapsed~spin"
  | "find-expanded"
  | "find-expanded~spin"
  | "find-next-match"
  | "find-next-match~spin"
  | "find-previous-match"
  | "find-previous-match~spin"
  | "find-replace"
  | "find-replace~spin"
  | "find-replace-all"
  | "find-replace-all~spin"
  | "find-selection"
  | "find-selection~spin"
  | "folding-collapsed"
  | "folding-collapsed~spin"
  | "folding-expanded"
  | "folding-expanded~spin"
  | "marker-navigation-next"
  | "marker-navigation-next~spin"
  | "marker-navigation-previous"
  | "marker-navigation-previous~spin"
  | "menu-selection"
  | "menu-selection~spin"
  | "menu-submenu"
  | "menu-submenu~spin"
  | "menubar-more"
  | "menubar-more~spin"
  | "notifications-clear"
  | "notifications-clear~spin"
  | "notifications-clear-all"
  | "notifications-clear-all~spin"
  | "notifications-collapse"
  | "notifications-collapse~spin"
  | "notifications-configure"
  | "notifications-configure~spin"
  | "notifications-expand"
  | "notifications-expand~spin"
  | "notifications-hide"
  | "notifications-hide~spin"
  | "panel-close"
  | "panel-close~spin"
  | "panel-maximize"
  | "panel-maximize~spin"
  | "panel-restore"
  | "panel-restore~spin"
  | "parameter-hints-next"
  | "parameter-hints-next~spin"
  | "parameter-hints-previous"
  | "parameter-hints-previous~spin"
  | "quick-input-back"
  | "quick-input-back~spin"
  | "remote-explorer-documentation"
  | "remote-explorer-documentation~spin"
  | "remote-explorer-feedback"
  | "remote-explorer-feedback~spin"
  | "remote-explorer-get-started"
  | "remote-explorer-get-started~spin"
  | "remote-explorer-report-issues"
  | "remote-explorer-report-issues~spin"
  | "remote-explorer-review-issues"
  | "remote-explorer-review-issues~spin"
  | "scrollbar-button-down"
  | "scrollbar-button-down~spin"
  | "scrollbar-button-left"
  | "scrollbar-button-left~spin"
  | "scrollbar-button-right"
  | "scrollbar-button-right~spin"
  | "scrollbar-button-up"
  | "scrollbar-button-up~spin"
  | "search-clear-results"
  | "search-clear-results~spin"
  | "search-collapse-results"
  | "search-collapse-results~spin"
  | "search-details"
  | "search-details~spin"
  | "search-expand-results"
  | "search-expand-results~spin"
  | "search-goto-file"
  | "search-goto-file~spin"
  | "search-hide-replace"
  | "search-hide-replace~spin"
  | "search-new-editor"
  | "search-new-editor~spin"
  | "search-refresh"
  | "search-refresh~spin"
  | "search-remove"
  | "search-remove~spin"
  | "search-replace"
  | "search-replace~spin"
  | "search-replace-all"
  | "search-replace-all~spin"
  | "search-show-context"
  | "search-show-context~spin"
  | "search-show-replace"
  | "search-show-replace~spin"
  | "suggest-more-info"
  | "suggest-more-info~spin"
  | "toolbar-more"
  | "toolbar-more~spin"
  | "tree-filter-clear"
  | "tree-filter-clear~spin"
  | "tree-filter-on-type-off"
  | "tree-filter-on-type-off~spin"
  | "tree-filter-on-type-on"
  | "tree-filter-on-type-on~spin"
  | "tree-item-expanded"
  | "tree-item-expanded~spin"
  | "tree-item-loading"
  | "tree-item-loading~spin"
  | "account"
  | "account~spin"
  | "activate-breakpoints"
  | "activate-breakpoints~spin"
  | "add"
  | "add~spin"
  | "alert"
  | "alert~spin"
  | "archive"
  | "archive~spin"
  | "array"
  | "array~spin"
  | "arrow-both"
  | "arrow-both~spin"
  | "arrow-down"
  | "arrow-down~spin"
  | "arrow-left"
  | "arrow-left~spin"
  | "arrow-right"
  | "arrow-right~spin"
  | "arrow-small-down"
  | "arrow-small-down~spin"
  | "arrow-small-left"
  | "arrow-small-left~spin"
  | "arrow-small-right"
  | "arrow-small-right~spin"
  | "arrow-small-up"
  | "arrow-small-up~spin"
  | "arrow-up"
  | "arrow-up~spin"
  | "beaker"
  | "beaker~spin"
  | "bell"
  | "bell~spin"
  | "bell-dot"
  | "bell-dot~spin"
  | "bold"
  | "bold~spin"
  | "book"
  | "book~spin"
  | "bookmark"
  | "bookmark~spin"
  | "briefcase"
  | "briefcase~spin"
  | "broadcast"
  | "broadcast~spin"
  | "browser"
  | "browser~spin"
  | "bug"
  | "bug~spin"
  | "calendar"
  | "calendar~spin"
  | "call-incoming"
  | "call-incoming~spin"
  | "call-outgoing"
  | "call-outgoing~spin"
  | "case-sensitive"
  | "case-sensitive~spin"
  | "check"
  | "check~spin"
  | "checklist"
  | "checklist~spin"
  | "chevron-down"
  | "chevron-down~spin"
  | "chevron-left"
  | "chevron-left~spin"
  | "chevron-right"
  | "chevron-right~spin"
  | "chevron-up"
  | "chevron-up~spin"
  | "chrome-close"
  | "chrome-close~spin"
  | "chrome-maximize"
  | "chrome-maximize~spin"
  | "chrome-minimize"
  | "chrome-minimize~spin"
  | "chrome-restore"
  | "chrome-restore~spin"
  | "circle-filled"
  | "circle-filled~spin"
  | "circle-outline"
  | "circle-outline~spin"
  | "circle-slash"
  | "circle-slash~spin"
  | "circuit-board"
  | "circuit-board~spin"
  | "clear-all"
  | "clear-all~spin"
  | "clippy"
  | "clippy~spin"
  | "clock"
  | "clock~spin"
  | "clone"
  | "clone~spin"
  | "close"
  | "close~spin"
  | "close-all"
  | "close-all~spin"
  | "close-dirty"
  | "close-dirty~spin"
  | "cloud-download"
  | "cloud-download~spin"
  | "cloud-upload"
  | "cloud-upload~spin"
  | "code"
  | "code~spin"
  | "collapse-all"
  | "collapse-all~spin"
  | "color-mode"
  | "color-mode~spin"
  | "comment"
  | "comment~spin"
  | "comment-add"
  | "comment-add~spin"
  | "comment-discussion"
  | "comment-discussion~spin"
  | "compare-changes"
  | "compare-changes~spin"
  | "console"
  | "console~spin"
  | "credit-card"
  | "credit-card~spin"
  | "dash"
  | "dash~spin"
  | "dashboard"
  | "dashboard~spin"
  | "database"
  | "database~spin"
  | "debug"
  | "debug~spin"
  | "debug-alt"
  | "debug-alt~spin"
  | "debug-alt-2"
  | "debug-alt-2~spin"
  | "debug-alternate"
  | "debug-alternate~spin"
  | "debug-breakpoint"
  | "debug-breakpoint~spin"
  | "debug-breakpoint-conditional"
  | "debug-breakpoint-conditional~spin"
  | "debug-breakpoint-conditional-disabled"
  | "debug-breakpoint-conditional-disabled~spin"
  | "debug-breakpoint-conditional-unverified"
  | "debug-breakpoint-conditional-unverified~spin"
  | "debug-breakpoint-data"
  | "debug-breakpoint-data~spin"
  | "debug-breakpoint-data-disabled"
  | "debug-breakpoint-data-disabled~spin"
  | "debug-breakpoint-data-unverified"
  | "debug-breakpoint-data-unverified~spin"
  | "debug-breakpoint-disabled"
  | "debug-breakpoint-disabled~spin"
  | "debug-breakpoint-function"
  | "debug-breakpoint-function~spin"
  | "debug-breakpoint-function-disabled"
  | "debug-breakpoint-function-disabled~spin"
  | "debug-breakpoint-function-unverified"
  | "debug-breakpoint-function-unverified~spin"
  | "debug-breakpoint-log"
  | "debug-breakpoint-log~spin"
  | "debug-breakpoint-log-disabled"
  | "debug-breakpoint-log-disabled~spin"
  | "debug-breakpoint-log-unverified"
  | "debug-breakpoint-log-unverified~spin"
  | "debug-breakpoint-unsupported"
  | "debug-breakpoint-unsupported~spin"
  | "debug-breakpoint-unverified"
  | "debug-breakpoint-unverified~spin"
  | "debug-console"
  | "debug-console~spin"
  | "debug-continue"
  | "debug-continue~spin"
  | "debug-disconnect"
  | "debug-disconnect~spin"
  | "debug-hint"
  | "debug-hint~spin"
  | "debug-pause"
  | "debug-pause~spin"
  | "debug-restart"
  | "debug-restart~spin"
  | "debug-restart-frame"
  | "debug-restart-frame~spin"
  | "debug-reverse-continue"
  | "debug-reverse-continue~spin"
  | "debug-stackframe"
  | "debug-stackframe~spin"
  | "debug-stackframe-active"
  | "debug-stackframe-active~spin"
  | "debug-stackframe-dot"
  | "debug-stackframe-dot~spin"
  | "debug-stackframe-focused"
  | "debug-stackframe-focused~spin"
  | "debug-start"
  | "debug-start~spin"
  | "debug-step-back"
  | "debug-step-back~spin"
  | "debug-step-into"
  | "debug-step-into~spin"
  | "debug-step-out"
  | "debug-step-out~spin"
  | "debug-step-over"
  | "debug-step-over~spin"
  | "debug-stop"
  | "debug-stop~spin"
  | "desktop-download"
  | "desktop-download~spin"
  | "device-camera"
  | "device-camera~spin"
  | "device-camera-video"
  | "device-camera-video~spin"
  | "device-desktop"
  | "device-desktop~spin"
  | "device-mobile"
  | "device-mobile~spin"
  | "diff"
  | "diff~spin"
  | "diff-added"
  | "diff-added~spin"
  | "diff-ignored"
  | "diff-ignored~spin"
  | "diff-modified"
  | "diff-modified~spin"
  | "diff-removed"
  | "diff-removed~spin"
  | "diff-renamed"
  | "diff-renamed~spin"
  | "discard"
  | "discard~spin"
  | "edit"
  | "edit~spin"
  | "editor-layout"
  | "editor-layout~spin"
  | "ellipsis"
  | "ellipsis~spin"
  | "empty-window"
  | "empty-window~spin"
  | "error"
  | "error~spin"
  | "exclude"
  | "exclude~spin"
  | "expand-all"
  | "expand-all~spin"
  | "extensions"
  | "extensions~spin"
  | "eye"
  | "eye~spin"
  | "eye-closed"
  | "eye-closed~spin"
  | "eye-unwatch"
  | "eye-unwatch~spin"
  | "eye-watch"
  | "eye-watch~spin"
  | "feedback"
  | "feedback~spin"
  | "file"
  | "file~spin"
  | "file-add"
  | "file-add~spin"
  | "file-binary"
  | "file-binary~spin"
  | "file-code"
  | "file-code~spin"
  | "file-directory"
  | "file-directory~spin"
  | "file-directory-create"
  | "file-directory-create~spin"
  | "file-media"
  | "file-media~spin"
  | "file-pdf"
  | "file-pdf~spin"
  | "file-submodule"
  | "file-submodule~spin"
  | "file-symlink-directory"
  | "file-symlink-directory~spin"
  | "file-symlink-file"
  | "file-symlink-file~spin"
  | "file-text"
  | "file-text~spin"
  | "file-zip"
  | "file-zip~spin"
  | "files"
  | "files~spin"
  | "filter"
  | "filter~spin"
  | "flame"
  | "flame~spin"
  | "fold"
  | "fold~spin"
  | "fold-down"
  | "fold-down~spin"
  | "fold-up"
  | "fold-up~spin"
  | "folder"
  | "folder~spin"
  | "folder-active"
  | "folder-active~spin"
  | "folder-opened"
  | "folder-opened~spin"
  | "gear"
  | "gear~spin"
  | "gift"
  | "gift~spin"
  | "gist"
  | "gist~spin"
  | "gist-fork"
  | "gist-fork~spin"
  | "gist-new"
  | "gist-new~spin"
  | "gist-private"
  | "gist-private~spin"
  | "gist-secret"
  | "gist-secret~spin"
  | "git-branch"
  | "git-branch~spin"
  | "git-branch-create"
  | "git-branch-create~spin"
  | "git-branch-delete"
  | "git-branch-delete~spin"
  | "git-commit"
  | "git-commit~spin"
  | "git-compare"
  | "git-compare~spin"
  | "git-fork-private"
  | "git-fork-private~spin"
  | "git-merge"
  | "git-merge~spin"
  | "git-pull-request"
  | "git-pull-request~spin"
  | "git-pull-request-abandoned"
  | "git-pull-request-abandoned~spin"
  | "github"
  | "github~spin"
  | "github-action"
  | "github-action~spin"
  | "github-alt"
  | "github-alt~spin"
  | "github-inverted"
  | "github-inverted~spin"
  | "globe"
  | "globe~spin"
  | "go-to-file"
  | "go-to-file~spin"
  | "grabber"
  | "grabber~spin"
  | "graph"
  | "graph~spin"
  | "gripper"
  | "gripper~spin"
  | "group-by-ref-type"
  | "group-by-ref-type~spin"
  | "heart"
  | "heart~spin"
  | "history"
  | "history~spin"
  | "home"
  | "home~spin"
  | "horizontal-rule"
  | "horizontal-rule~spin"
  | "hubot"
  | "hubot~spin"
  | "inbox"
  | "inbox~spin"
  | "info"
  | "info~spin"
  | "issue-closed"
  | "issue-closed~spin"
  | "issue-opened"
  | "issue-opened~spin"
  | "issue-reopened"
  | "issue-reopened~spin"
  | "issues"
  | "issues~spin"
  | "italic"
  | "italic~spin"
  | "jersey"
  | "jersey~spin"
  | "json"
  | "json~spin"
  | "kebab-horizontal"
  | "kebab-horizontal~spin"
  | "kebab-vertical"
  | "kebab-vertical~spin"
  | "key"
  | "key~spin"
  | "keyboard"
  | "keyboard~spin"
  | "law"
  | "law~spin"
  | "library"
  | "library~spin"
  | "light-bulb"
  | "light-bulb~spin"
  | "lightbulb"
  | "lightbulb~spin"
  | "lightbulb-autofix"
  | "lightbulb-autofix~spin"
  | "link"
  | "link~spin"
  | "link-external"
  | "link-external~spin"
  | "list-filter"
  | "list-filter~spin"
  | "list-flat"
  | "list-flat~spin"
  | "list-ordered"
  | "list-ordered~spin"
  | "list-selection"
  | "list-selection~spin"
  | "list-tree"
  | "list-tree~spin"
  | "list-unordered"
  | "list-unordered~spin"
  | "live-share"
  | "live-share~spin"
  | "loading"
  | "loading~spin"
  | "location"
  | "location~spin"
  | "lock"
  | "lock~spin"
  | "log-in"
  | "log-in~spin"
  | "log-out"
  | "log-out~spin"
  | "logo-github"
  | "logo-github~spin"
  | "mail"
  | "mail~spin"
  | "mail-read"
  | "mail-read~spin"
  | "mail-reply"
  | "mail-reply~spin"
  | "mark-github"
  | "mark-github~spin"
  | "markdown"
  | "markdown~spin"
  | "megaphone"
  | "megaphone~spin"
  | "mention"
  | "mention~spin"
  | "menu"
  | "menu~spin"
  | "microscope"
  | "microscope~spin"
  | "milestone"
  | "milestone~spin"
  | "mirror"
  | "mirror~spin"
  | "mirror-private"
  | "mirror-private~spin"
  | "mirror-public"
  | "mirror-public~spin"
  | "more"
  | "more~spin"
  | "mortar-board"
  | "mortar-board~spin"
  | "move"
  | "move~spin"
  | "multiple-windows"
  | "multiple-windows~spin"
  | "mute"
  | "mute~spin"
  | "new-file"
  | "new-file~spin"
  | "new-folder"
  | "new-folder~spin"
  | "no-newline"
  | "no-newline~spin"
  | "note"
  | "note~spin"
  | "octoface"
  | "octoface~spin"
  | "open-preview"
  | "open-preview~spin"
  | "organization"
  | "organization~spin"
  | "organization-filled"
  | "organization-filled~spin"
  | "organization-outline"
  | "organization-outline~spin"
  | "output"
  | "output~spin"
  | "package"
  | "package~spin"
  | "paintcan"
  | "paintcan~spin"
  | "pencil"
  | "pencil~spin"
  | "person"
  | "person~spin"
  | "person-add"
  | "person-add~spin"
  | "person-filled"
  | "person-filled~spin"
  | "person-follow"
  | "person-follow~spin"
  | "person-outline"
  | "person-outline~spin"
  | "pin"
  | "pin~spin"
  | "pinned"
  | "pinned~spin"
  | "play"
  | "play~spin"
  | "plug"
  | "plug~spin"
  | "plus"
  | "plus~spin"
  | "preserve-case"
  | "preserve-case~spin"
  | "preview"
  | "preview~spin"
  | "primitive-dot"
  | "primitive-dot~spin"
  | "primitive-square"
  | "primitive-square~spin"
  | "project"
  | "project~spin"
  | "pulse"
  | "pulse~spin"
  | "question"
  | "question~spin"
  | "quote"
  | "quote~spin"
  | "radio-tower"
  | "radio-tower~spin"
  | "reactions"
  | "reactions~spin"
  | "record-keys"
  | "record-keys~spin"
  | "references"
  | "references~spin"
  | "refresh"
  | "refresh~spin"
  | "regex"
  | "regex~spin"
  | "remote"
  | "remote~spin"
  | "remote-explorer"
  | "remote-explorer~spin"
  | "remove"
  | "remove~spin"
  | "remove-close"
  | "remove-close~spin"
  | "repl"
  | "repl~spin"
  | "replace"
  | "replace~spin"
  | "replace-all"
  | "replace-all~spin"
  | "reply"
  | "reply~spin"
  | "repo"
  | "repo~spin"
  | "repo-clone"
  | "repo-clone~spin"
  | "repo-create"
  | "repo-create~spin"
  | "repo-delete"
  | "repo-delete~spin"
  | "repo-force-push"
  | "repo-force-push~spin"
  | "repo-forked"
  | "repo-forked~spin"
  | "repo-pull"
  | "repo-pull~spin"
  | "repo-push"
  | "repo-push~spin"
  | "repo-sync"
  | "repo-sync~spin"
  | "report"
  | "report~spin"
  | "request-changes"
  | "request-changes~spin"
  | "rocket"
  | "rocket~spin"
  | "root-folder"
  | "root-folder~spin"
  | "root-folder-opened"
  | "root-folder-opened~spin"
  | "rss"
  | "rss~spin"
  | "ruby"
  | "ruby~spin"
  | "run"
  | "run~spin"
  | "run-all"
  | "run-all~spin"
  | "save"
  | "save~spin"
  | "save-all"
  | "save-all~spin"
  | "save-as"
  | "save-as~spin"
  | "screen-full"
  | "screen-full~spin"
  | "screen-normal"
  | "screen-normal~spin"
  | "search"
  | "search~spin"
  | "search-save"
  | "search-save~spin"
  | "search-stop"
  | "search-stop~spin"
  | "selection"
  | "selection~spin"
  | "server"
  | "server~spin"
  | "settings"
  | "settings~spin"
  | "settings-gear"
  | "settings-gear~spin"
  | "shield"
  | "shield~spin"
  | "sign-in"
  | "sign-in~spin"
  | "sign-out"
  | "sign-out~spin"
  | "smiley"
  | "smiley~spin"
  | "sort-precedence"
  | "sort-precedence~spin"
  | "source-control"
  | "source-control~spin"
  | "split-horizontal"
  | "split-horizontal~spin"
  | "split-vertical"
  | "split-vertical~spin"
  | "squirrel"
  | "squirrel~spin"
  | "star"
  | "star~spin"
  | "star-add"
  | "star-add~spin"
  | "star-delete"
  | "star-delete~spin"
  | "star-empty"
  | "star-empty~spin"
  | "star-full"
  | "star-full~spin"
  | "star-half"
  | "star-half~spin"
  | "stop"
  | "stop~spin"
  | "symbol-array"
  | "symbol-array~spin"
  | "symbol-boolean"
  | "symbol-boolean~spin"
  | "symbol-class"
  | "symbol-class~spin"
  | "symbol-color"
  | "symbol-color~spin"
  | "symbol-constant"
  | "symbol-constant~spin"
  | "symbol-constructor"
  | "symbol-constructor~spin"
  | "symbol-enum"
  | "symbol-enum~spin"
  | "symbol-enum-member"
  | "symbol-enum-member~spin"
  | "symbol-event"
  | "symbol-event~spin"
  | "symbol-field"
  | "symbol-field~spin"
  | "symbol-file"
  | "symbol-file~spin"
  | "symbol-folder"
  | "symbol-folder~spin"
  | "symbol-function"
  | "symbol-function~spin"
  | "symbol-interface"
  | "symbol-interface~spin"
  | "symbol-key"
  | "symbol-key~spin"
  | "symbol-keyword"
  | "symbol-keyword~spin"
  | "symbol-method"
  | "symbol-method~spin"
  | "symbol-misc"
  | "symbol-misc~spin"
  | "symbol-module"
  | "symbol-module~spin"
  | "symbol-namespace"
  | "symbol-namespace~spin"
  | "symbol-null"
  | "symbol-null~spin"
  | "symbol-number"
  | "symbol-number~spin"
  | "symbol-numeric"
  | "symbol-numeric~spin"
  | "symbol-object"
  | "symbol-object~spin"
  | "symbol-operator"
  | "symbol-operator~spin"
  | "symbol-package"
  | "symbol-package~spin"
  | "symbol-parameter"
  | "symbol-parameter~spin"
  | "symbol-property"
  | "symbol-property~spin"
  | "symbol-reference"
  | "symbol-reference~spin"
  | "symbol-ruler"
  | "symbol-ruler~spin"
  | "symbol-snippet"
  | "symbol-snippet~spin"
  | "symbol-string"
  | "symbol-string~spin"
  | "symbol-struct"
  | "symbol-struct~spin"
  | "symbol-structure"
  | "symbol-structure~spin"
  | "symbol-text"
  | "symbol-text~spin"
  | "symbol-type-parameter"
  | "symbol-type-parameter~spin"
  | "symbol-unit"
  | "symbol-unit~spin"
  | "symbol-value"
  | "symbol-value~spin"
  | "symbol-variable"
  | "symbol-variable~spin"
  | "sync"
  | "sync~spin"
  | "sync-ignored"
  | "sync-ignored~spin"
  | "tag"
  | "tag~spin"
  | "tag-add"
  | "tag-add~spin"
  | "tag-remove"
  | "tag-remove~spin"
  | "tasklist"
  | "tasklist~spin"
  | "telescope"
  | "telescope~spin"
  | "terminal"
  | "terminal~spin"
  | "text-size"
  | "text-size~spin"
  | "three-bars"
  | "three-bars~spin"
  | "thumbsdown"
  | "thumbsdown~spin"
  | "thumbsup"
  | "thumbsup~spin"
  | "tools"
  | "tools~spin"
  | "trash"
  | "trash~spin"
  | "trashcan"
  | "trashcan~spin"
  | "triangle-down"
  | "triangle-down~spin"
  | "triangle-left"
  | "triangle-left~spin"
  | "triangle-right"
  | "triangle-right~spin"
  | "triangle-up"
  | "triangle-up~spin"
  | "twitter"
  | "twitter~spin"
  | "unfold"
  | "unfold~spin"
  | "ungroup-by-ref-type"
  | "ungroup-by-ref-type~spin"
  | "unlock"
  | "unlock~spin"
  | "unmute"
  | "unmute~spin"
  | "unverified"
  | "unverified~spin"
  | "variable"
  | "variable~spin"
  | "verified"
  | "verified~spin"
  | "versions"
  | "versions~spin"
  | "vm"
  | "vm~spin"
  | "vm-active"
  | "vm-active~spin"
  | "vm-outline"
  | "vm-outline~spin"
  | "vm-running"
  | "vm-running~spin"
  | "warning"
  | "warning~spin"
  | "watch"
  | "watch~spin"
  | "whitespace"
  | "whitespace~spin"
  | "whole-word"
  | "whole-word~spin"
  | "window"
  | "window~spin"
  | "word-wrap"
  | "word-wrap~spin"
  | "wrench"
  | "wrench~spin"
  | "wrench-subaction"
  | "wrench-subaction~spin"
  | "x"
  | "x~spin"
  | "zap"
  | "zap~spin"
  | "zoom-in"
  | "zoom-in~spin"
  | "zoom-out"
  | "zoom-out~spin";
