import { isPrimitiveObject, isString } from 'typesafe-utils'
import {
	LangaugeBaseTranslation,
	LangaugeTranslationKey,
	InjectorPart,
	SingularPluralPart,
	Part,
	Formatters,
	LangaugeBaseTranslationArgs,
	TranslationParts,
	Config,
	TranslatorFn,
	Cache,
} from '../types'
import { parseRawText } from './parser'

const getTextFromTranslationKey = <T extends LangaugeBaseTranslation>(
	translationObject: T,
	key: LangaugeTranslationKey<T>,
): string => translationObject[key] || (key as string)

const applyFormatters = (formatters: Formatters, formatterKeys: string[], value: unknown) =>
	formatterKeys.reduce((prev, formatterKey) => {
		const formatter = formatters[formatterKey]
		return formatter ? formatter(prev) : prev
	}, value)

const applyValues = (textParts: Part[], formatters: Formatters, args: LangaugeBaseTranslationArgs) => {
	return textParts
		.map((part) => {
			if (isString(part)) {
				return part
			}

			const { k: key = '0', f: formatterKeys = [] } = part as InjectorPart
			const { s: singular = '', p: plural } = part as SingularPluralPart
			if (plural) {
				return args[key] == '1' ? singular : plural
			}

			const value = args[key]

			const formattedValue = formatterKeys.length ? applyFormatters(formatters, formatterKeys, value) : value

			return ('' + (formattedValue ?? '')).trim()
		})
		.join('')
}

const getTextParts = <T extends LangaugeBaseTranslation>(
	cache: Cache<T>,
	translationObject: T,
	key: LangaugeTranslationKey<T>,
): Part[] => {
	const cached = cache && cache[key]
	if (cached) return cached

	const rawText = getTextFromTranslationKey(translationObject, key)
	const textInfo = parseRawText(rawText)

	cache && (cache[key] = textInfo)
	return textInfo
}

const wrapTranslateFunction = <T extends LangaugeBaseTranslation>(
	translationObject: T,
	{ formatters = {}, useCache = true }: Config,
) => {
	const cache: Cache<T> = (useCache && ({} as TranslationParts<T>)) || null
	return (key: LangaugeTranslationKey<T>, ...args: unknown[]) => {
		const textInfo = getTextParts(cache, translationObject, key)

		const transformedArgs = ((args.length === 1 && isPrimitiveObject(args[0])
			? args[0]
			: args) as unknown) as LangaugeBaseTranslationArgs

		return applyValues(textInfo, formatters, transformedArgs)
	}
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const langauge = <TO extends LangaugeBaseTranslation, TF extends object = TranslatorFn<TO>>(
	translationObject: TO,
	config: Config = {},
): TF => {
	const translateFunction = wrapTranslateFunction(translationObject, config)

	return new Proxy<TF>({} as TF, {
		get: (_target, name: string) => translateFunction.bind(null, name),
	})
}