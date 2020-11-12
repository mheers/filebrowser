package auth

import (
	"net/http"

	"github.com/filebrowser/filebrowser/v2/settings"
	"github.com/filebrowser/filebrowser/v2/users"
)

// CustomAuthFn is the interface for a custom authentication function
type CustomAuthFn func(*http.Request, *users.Storage, string) (*users.User, error)

// CustomLoginPageFn is the interface for a custom login-page function
type CustomLoginPageFn func() bool

func defaultAuthFnImpl(r *http.Request, sto *users.Storage, root string) (*users.User, error) {
	return sto.Get(root, uint(1))
}

func defaultLoginPageFnImpl() bool {
	return true
}

// MethodCustom is used to identify the custom authenticator.
const MethodCustom settings.AuthMethod = "custom"

var CustomAuthFnImpl CustomAuthFn
var CustomLoginPageFnImpl CustomLoginPageFn

func Init() {
	CustomAuthFnImpl = defaultAuthFnImpl
	CustomLoginPageFnImpl = defaultLoginPageFnImpl
}

// CustomAuth is no auth implementation of auther.
type CustomAuth struct {
}

// Auth uses authenticates user 1.
func (a CustomAuth) Auth(r *http.Request, sto *users.Storage, root string) (*users.User, error) {
	if (CustomAuthFnImpl) != nil {
		return CustomAuthFnImpl(r, sto, root)
	}
	return defaultAuthFnImpl(r, sto, root)
}

// LoginPage tells that no auth doesn't require a login page.
func (a CustomAuth) LoginPage() bool {
	if (CustomLoginPageFnImpl) != nil {
		return CustomLoginPageFnImpl()
	}
	return defaultLoginPageFnImpl()
}
