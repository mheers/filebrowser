import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import Layout from "@/views/Layout";
import Files from "@/views/Files";
import Share from "@/views/Share";
import Users from "@/views/settings/Users";
import User from "@/views/settings/User";
import Settings from "@/views/Settings";
import GlobalSettings from "@/views/settings/Global";
import ProfileSettings from "@/views/settings/Profile";
import Shares from "@/views/settings/Shares";
import Errors from "@/views/Errors";
import store from "@/store";
import { baseURL } from "@/utils/constants";

Vue.use(Router);

const router = new Router({
  base: baseURL,
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.getters.isLogged) {
          return next({ path: "/files" });
        }

        document.title = "Login";
        next();
      },
    },
    {
      path: "/*",
      component: Layout,
      children: [
        {
          path: "/share/*",
          name: "Share",
          component: Share,
        },
        {
          path: "/files/*",
          name: "Files",
          component: Files,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/settings",
          name: "Settings",
          component: Settings,
          redirect: {
            path: "/settings/profile",
          },
          meta: {
            requiresAuth: true,
          },
          children: [
            {
              path: "/settings/profile",
              name: "Profile Settings",
              component: ProfileSettings,
            },
            {
              path: "/settings/shares",
              name: "Shares",
              component: Shares,
            },
            {
              path: "/settings/global",
              name: "Global Settings",
              component: GlobalSettings,
              meta: {
                requiresAdmin: true,
              },
            },
            {
              path: "/settings/users",
              name: "Users",
              component: Users,
              meta: {
                requiresAdmin: true,
              },
            },
            {
              path: "/settings/users/*",
              name: "User",
              component: User,
              meta: {
                requiresAdmin: true,
              },
            },
          ],
        },
        {
          path: "/403",
          name: "Forbidden",
          component: Errors,
          props: {
            errorCode: 403,
            showHeader: true,
          },
        },
        {
          path: "/404",
          name: "Not Found",
          component: Errors,
          props: {
            errorCode: 404,
            showHeader: true,
          },
        },
        {
          path: "/500",
          name: "Internal Server Error",
          component: Errors,
          props: {
            errorCode: 500,
            showHeader: true,
          },
        },
        {
          path: "/files",
          redirect: {
            path: "/files/",
          },
        },
        {
          path: "/*",
          redirect: (to) => `/files${to.path}`,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.name;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLogged) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });

      return;
    }

    if (to.matched.some((record) => record.meta.requiresAdmin)) {
      if (!store.state.user.perm.admin) {
        next({ path: "/403" });
        return;
      }
    }
  }

  // keeps the 'locale' query parameter if set
  if (
    Object.prototype.hasOwnProperty.call(from.query, "locale") &&
    !Object.prototype.hasOwnProperty.call(to.query, "locale")
  ) {
    if (to.path === from.path) {
      return;
    }
    if (!to.query) {
      to.query = {};
    }
    to.query.locale = [from.locale];

    next({ path: to.path, query: to.query, replace: true });
  } else {
    next();
  }

  next();
});

router.afterEach((to, from) => {
  window.parent.postMessage(
    { type: "filebrowserURLChanged", from: from.path, to: to.path },
    "*"
  );
});

export default router;
