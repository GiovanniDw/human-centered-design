<script setup>
import { set } from '@vueuse/shared'

const { y } = useWindowScroll()

// const story = await useAsyncStoryblok('config', {
//   version: 'draft',
//   resolve_links: 'url',
// })

const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/stories/config', {
  version: 'draft',
  resolve_links: 'url',
})

const headerMenu = ref(null)
headerMenu.value = data.story.content.header_menu_center

const mobileNavOpen = ref(false)

const mobile = breakpoints().smallerOrEqual('tablet')
const largerThanMobile = breakpoints().greater('tablet')

const toggleMobileNav = useToggle(mobileNavOpen)

// const mobileHeaderClass = reactive({})

const headerRef = ref(null)
const { transform } = useElementTransform(headerRef)
const { height } = useElementBounding(headerRef)

const headerHeight = computed(() => {
  return height.value + 'px'
})

transform.transformPerspective
</script>

<template>
  <header
    ref="headerRef"
    :class="{
      scrolled: y > 10,
      'mobile-nav': largerThanMobile === false,
      'mobile-nav-open': mobileNavOpen && largerThanMobile === false,
    }"
  >
    <div class="header-start">
      <NuxtLink title="1clicklayout" class="logo header-brand" to="/">
        <LogoResponsive />
      </NuxtLink>
      <div v-if="mobile" class="header-top-right">
        <NuxtLink class="btn inverse button">
          Request Demo
          <span class="icon material-symbols-rounded">chevron_right</span>
        </NuxtLink>
        <button
          @click="toggleMobileNav()"
          class="nav-toggle"
          :class="{ open: mobileNavOpen }"
        >
          <span class="nav-toggle-icon" :class="{ open: mobileNavOpen }" />
        </button>
      </div>
    </div>
    <nav v-if="headerMenu" class="header-center">
      <template v-for="blok in headerMenu" :item="blok">
        <NuxtLink
          @click="toggleMobileNav()"
          v-if="blok.link.linktype === 'story'"
          :to="blok.link.story.url"
          :key="blok.link.id"
        >
          {{ blok.title }}
        </NuxtLink>
        <NuxtLink
          v-else
          :to="blok.link.cached_url"
          :key="blok._uid"
          target="_blank"
          :external="true"
          rel="noopener noreferrer"
        >
          {{ blok.title }}
          <span class="icon material-symbols-rounded">open_in_new</span>
        </NuxtLink>
      </template>
    </nav>
    <div class="header-end">
      <NuxtLink
        to="https://app.oneclicklayout.io/login"
        target="_blank"
        rel="noopener noreferrer"
      >
        Login
        <span class="icon material-symbols-rounded">open_in_new</span>
      </NuxtLink>
      <NuxtLink v-if="!mobile" class="btn inverse button">
        Request Demo
        <span class="icon material-symbols-rounded">chevron_right</span>
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
$m-icon: 2px;

header {
  height: auto;
  padding: 1.5em 1em;
  display: flex;
  top: 0;
  width: 100%;
  position: fixed;
  background-color: var(--color-beige);
  z-index: var(--z-index-header);
  transition: height 500ms ease;

  &.scrolled {
    box-shadow: var(--box-shadow);
  }

  .logo {
    padding: 0;
  }

  .header-start,
  .header-end {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .header-start {
    flex-basis: 0;
    flex-shrink: 3;
    justify-content: space-between;
    margin-right: auto;
  }
  nav.header-center {
    display: inline-flex;
    flex-basis: 2;
    align-self: center;
    justify-content: space-between;
  }
  .header-end {
    margin-left: auto;
    text-align: right;
    white-space: nowrap;
    justify-content: flex-end;
    flex-basis: 0;
    align-self: flex-end;
  }

  @media (max-width: 769px) {
    // transition-duration: 500ms;

    &.mobile-nav {
      position: fixed;
      width: 100vw;
      display: flex;
      // flex-direction: row;
      // max-height: 5em;
      overflow: hidden;
      transition: all 0.5s ease-in-out;
      flex-direction: column;
      justify-content: space-between;
      // align-items: space;
      // transition-duration: 500ms;
      // min-height: v-bind(headerHeight);
      min-height: 0;
      max-height: 90px;
      height: auto;
      //   padding:
      // env(safe-area-inset-top, 1.5em)
      // env(safe-area-inset-right, 1em)
      // env(safe-area-inset-bottom, 1.5em)
      // env(safe-area-inset-left, 1em);
      padding-bottom: calc(1em + env(safe-area-inset-bottom));
      // transition: min-height 0.5s ease;

      nav.header-center {
        flex-direction: column;
        gap: 5em;
      }

      nav.header-center,
      .header-end {
        // visibility: hidden;
        flex: 0;

        position: relative;

        z-index: 0;
        overflow: hidden;
        // height: 0;
        // transition: all 0.5s ease-in-out;
        flex-basis: 1;
        transition: all 500ms ease-in-out;
        justify-content: center;
        opacity: 0;
        transition: opacity 100ms ease;
        // gap: 1em;
        align-self: center;
        align-items: center;
        margin: 0;
        scale: 1;
      }
      .header-start {
        flex: none;
        flex-shrink: 0;
        top: 0;
        margin: 0;
        align-items: center;
        display: flex;
        justify-self: flex-start;
        justify-content: space-between;
        .header-top-right {
          display: flex;
          flex-direction: row;
          align-items: center;
          align-content: center;
          gap: var(--gap-s);
        }
      }
    }

    &.mobile-nav-open {
      position: fixed;
      // transition: min-height .5s ease;
      width: 100vw;

      min-height: 100%;
      justify-content: space-between;
      // align-items: space;

      // transition-duration: 500ms;

      .header-start,
      .header-center,
      .header-end {
        flex: none;
        display: flex;
        visibility: visible;
        max-height: auto;
        justify-content: space-between;
      }

      .header-start {
        top: 0;
        margin-right: 0;
        justify-content: space-between;
      }
      nav.header-center,
      .header-end {
        opacity: 1;
        height: auto;
        scale: 1;
        // transition-delay: 100ms;
        overflow: visible;
        display: flex;
        align-self: center;
        position: relative;
        transition: all 500ms ease-in-out;
      }
      nav.header-center {
        display: flex;
        // flex-basis: 1;
        flex-direction: column;
        // align-content: center;

        // justify-content: space-between;
        gap: 5em;
        position: relative;
        visibility: visible;
      }
      .header-end {
        align-content: space-around;
        justify-items: center;
        justify-content: space-around;
      }
    }
    button.nav-toggle {
      text-decoration: none;
      appearance: none;
      border: 0;
      background: 0;
      padding: 0;
      // margin: auto;
      display: flex;
      // justify-content: center;
      // align-content: center;
      // align-items: center;
      // justify-items: center;
      font-size: 16px;
      transition-duration: 500ms;
      height: $m-icon * 10;
      width: $m-icon * 10;
      // transform: translateY($m-icon * 4);
      cursor: pointer;

      .nav-toggle-icon {
        align-self: center;
        width: $m-icon * 10;
        height: $m-icon * 1;
        border-radius: $m-icon * 2;
        background-color: var(--color-black);
        // position: relative;
        transition: background 10ms 300ms ease;
        // transform: translateY($m-icon * 4);
        border-radius: $m-icon;
        &:before,
        &:after {
          left: 0;
          border-radius: $m-icon * 2;
          transition: top 300ms 350ms ease, transform 300ms 50ms ease;
          position: absolute;
          background: var(--color-black);
          width: $m-icon * 10;
          height: $m-icon * 1;
          content: '';
        }
        &:before {
          top: $m-icon * -3.5;
        }

        &:after {
          top: $m-icon * 3.5;
        }

        &.open {
          background: transparent;
          &:after,
          &:before {
            transition: top 300ms 50ms ease, transform 300ms 350ms ease;
            top: 0;
            left: 0;
          }
          &:before {
            transform: rotate(45deg);
          }
          &:after {
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
}
a {
  // line-height: inherit;
  display: inline-flex;
  text-decoration: none;
  align-items: center;
  color: var(--color-text);
  padding: var(--padding-s);
  font-size: var(--font-size);
  span.material-symbols-rounded {
    display: block;
    font-weight: 400;
  }
  &:hover {
    opacity: 0.8;
  }
  &.router-link-active {
    text-decoration: underline;
    text-shadow: 0 0 0.01px black, 0 0 0.01px black, 0 0 0.01px black;
  }
}

.button {
  padding: 0.7em 1em;
  background: var(--color-black);
  color: white;
  border-radius: 0.7em;
  justify-self: end;
  border: 0.1rem solid var(--color-background-inverse);
}
</style>
