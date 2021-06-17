// This types were auto-generated. Any manual changes will be overwritten.
/* eslint-disable */

import type { LocalizedString } from 'typesafe-i18n'

export type BaseLocale = 'en'

export type Locales =
	| 'en'

export type Translation = {
	/**
	 * Hi {name}!
	 * @param {string} name
	 */
	'STRING_TYPE': RequiredParams1<'name'>
	/**
	 * {0} apple{{s}}
	 * @param {number} 0
	 */
	'NUMBER_TYPE': RequiredParams1<'0'>
}

export type TranslationFunctions = {
	/**
	 * Hi {name}!
	 */
	'STRING_TYPE': (arg: { name: string }) => LocalizedString
	/**
	 * {0} apple{{s}}
	 */
	'NUMBER_TYPE': (arg0: number) => LocalizedString
}

export type Formatters = {}


type Param<P extends string> = `{${P}}`

type Params1<P1 extends string> =
	`${string}${Param<P1>}${string}`

type RequiredParams1<P1 extends string> =
	| Params1<P1>
