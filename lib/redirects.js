const redirects = [
  {
    source: "/",
    basePath: false,
    permanent: false,
    destination: "/d2c/admin",
  },
  {
    source: "/login",
    basePath: false,
    permanent: false,
    destination: "/d2c/admin/login",
  },
]

module.exports = { redirects }
