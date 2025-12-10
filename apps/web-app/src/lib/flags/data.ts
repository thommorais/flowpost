import { countries, type TCountries, type TCountryCode } from 'countries-list'

export type CountryFlag = {
	code: TCountryCode
	name: string
}

const ALL_CODES: readonly TCountryCode[] = (Object.keys(countries) as TCountryCode[]).sort()

const resolveName = (record: TCountries[TCountryCode] | undefined, code: TCountryCode): string => {
	if (record?.name) {
		return record.name
	}
	return code
}

const buildDataset = (): CountryFlag[] => {
	const uniqueCodes = Array.from(new Set(ALL_CODES))
	return uniqueCodes.map(code => {
		const record = countries[code]
		if (!record) {
			throw new Error(`Country code ${code} is not available in countries-list dataset`)
		}
		return {
			code,
			name: resolveName(record, code),
		}
	})
}

export const COUNTRY_FLAGS: CountryFlag[] = buildDataset()
