jest.disableAutomock();

// Until modules that import CSS can be imported with Jest, we need to manually mock them
jest.mock( 'components/ui/about', () => {} );
jest.mock( 'components/containers/home', () => {} );
jest.mock( 'components/containers/checkout', () => {} );
jest.mock( 'components/ui/not-found', () => {} );
jest.mock( 'components/containers/connect-user/login', () => {} );
jest.mock( 'components/containers/connect-user/signup', () => {} );
jest.mock( 'components/containers/connect-user/verify', () => {} );
jest.mock( 'components/ui/layout', () => {} );
jest.mock( 'components/ui/layout/header/default', () => {} );
jest.mock( 'components/ui/layout/header/search', () => {} );
jest.mock( 'components/containers/notices', () => {} );
jest.mock( 'components/containers/search', () => {} );
jest.mock( 'components/containers/success', () => {} );

import { getPath } from 'routes';

const routes = {
	path: '/',
	slug: 'home',
	childRoutes: [
		{
			path: 'foo',
			slug: 'foo',
			childRoutes: [
				{
					path: 'bar/(:optional)',
					slug: 'bar'
				}
			]
		},
		{
			path: 'receipt/(:id)',
			slug: 'receipt'
		},
		{
			path: 'post/:id/(:filter)',
			slug: 'post'
		},
		{
			childRoutes: [
				{
					path: 'sell',
					slug: 'sell'
				},
				{
					path: 'buy',
					slug: 'buy'
				}
			]
		}
	]
};

describe( 'routes', () => {
	describe( 'getPath', () => {
		it( 'should return the top level route', () => {
			expect( getPath( 'home', {}, routes ) ).toBe( '/' );
		} );

		it( 'should return a static nested route', () => {
			expect( getPath( 'bar', {}, routes ) ).toBe( '/foo/bar/' );
		} );

		it( 'should return a static nested route with a parent route with no path', () => {
			expect( getPath( 'buy', {}, routes ) ).toBe( '/buy' );
		} );

		it( 'should fill in optional values', () => {
			expect( getPath( 'bar', { optional: 12345 }, routes ) ).toBe( '/foo/bar/12345' );
		} );

		it( 'should fill in required values', () => {
			expect( getPath( 'receipt', { id: 2 }, routes ) ).toBe( '/receipt/2' );
		} );

		it( 'should fill in a mix of optional and required values', () => {
			expect( getPath( 'post', { id: 1, filter: 'published' }, routes ) ).toBe( '/post/1/published' );
		} );

		it( 'should ignore missing optional values', () => {
			expect( getPath( 'post', { id: 1 }, routes ) ).toBe( '/post/1/' );
		} );

		it( 'should return null for a missing slug', () => {
			expect( getPath( 'asdf', {}, routes ) ).toBe( null );
		} );
	} );
} );