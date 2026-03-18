import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model crew
 *
 */
export type crewModel = runtime.Types.Result.DefaultSelection<Prisma.$crewPayload>;
export type AggregateCrew = {
    _count: CrewCountAggregateOutputType | null;
    _min: CrewMinAggregateOutputType | null;
    _max: CrewMaxAggregateOutputType | null;
};
export type CrewMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    name: string | null;
    password: string | null;
};
export type CrewMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    name: string | null;
    password: string | null;
};
export type CrewCountAggregateOutputType = {
    id: number;
    email: number;
    name: number;
    password: number;
    _all: number;
};
export type CrewMinAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    password?: true;
};
export type CrewMaxAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    password?: true;
};
export type CrewCountAggregateInputType = {
    id?: true;
    email?: true;
    name?: true;
    password?: true;
    _all?: true;
};
export type CrewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which crew to aggregate.
     */
    where?: Prisma.crewWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of crews to fetch.
     */
    orderBy?: Prisma.crewOrderByWithRelationInput | Prisma.crewOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.crewWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` crews from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` crews.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned crews
    **/
    _count?: true | CrewCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: CrewMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: CrewMaxAggregateInputType;
};
export type GetCrewAggregateType<T extends CrewAggregateArgs> = {
    [P in keyof T & keyof AggregateCrew]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCrew[P]> : Prisma.GetScalarType<T[P], AggregateCrew[P]>;
};
export type crewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.crewWhereInput;
    orderBy?: Prisma.crewOrderByWithAggregationInput | Prisma.crewOrderByWithAggregationInput[];
    by: Prisma.CrewScalarFieldEnum[] | Prisma.CrewScalarFieldEnum;
    having?: Prisma.crewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CrewCountAggregateInputType | true;
    _min?: CrewMinAggregateInputType;
    _max?: CrewMaxAggregateInputType;
};
export type CrewGroupByOutputType = {
    id: string;
    email: string;
    name: string | null;
    password: string;
    _count: CrewCountAggregateOutputType | null;
    _min: CrewMinAggregateOutputType | null;
    _max: CrewMaxAggregateOutputType | null;
};
type GetCrewGroupByPayload<T extends crewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CrewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CrewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CrewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CrewGroupByOutputType[P]>;
}>>;
export type crewWhereInput = {
    AND?: Prisma.crewWhereInput | Prisma.crewWhereInput[];
    OR?: Prisma.crewWhereInput[];
    NOT?: Prisma.crewWhereInput | Prisma.crewWhereInput[];
    id?: Prisma.StringFilter<"crew"> | string;
    email?: Prisma.StringFilter<"crew"> | string;
    name?: Prisma.StringNullableFilter<"crew"> | string | null;
    password?: Prisma.StringFilter<"crew"> | string;
    flights?: Prisma.FlightListRelationFilter;
};
export type crewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    password?: Prisma.SortOrder;
    flights?: Prisma.flightOrderByRelationAggregateInput;
};
export type crewWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.crewWhereInput | Prisma.crewWhereInput[];
    OR?: Prisma.crewWhereInput[];
    NOT?: Prisma.crewWhereInput | Prisma.crewWhereInput[];
    name?: Prisma.StringNullableFilter<"crew"> | string | null;
    password?: Prisma.StringFilter<"crew"> | string;
    flights?: Prisma.FlightListRelationFilter;
}, "id" | "email">;
export type crewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    password?: Prisma.SortOrder;
    _count?: Prisma.crewCountOrderByAggregateInput;
    _max?: Prisma.crewMaxOrderByAggregateInput;
    _min?: Prisma.crewMinOrderByAggregateInput;
};
export type crewScalarWhereWithAggregatesInput = {
    AND?: Prisma.crewScalarWhereWithAggregatesInput | Prisma.crewScalarWhereWithAggregatesInput[];
    OR?: Prisma.crewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.crewScalarWhereWithAggregatesInput | Prisma.crewScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"crew"> | string;
    email?: Prisma.StringWithAggregatesFilter<"crew"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"crew"> | string | null;
    password?: Prisma.StringWithAggregatesFilter<"crew"> | string;
};
export type crewCreateInput = {
    id?: string;
    email: string;
    name?: string | null;
    password: string;
    flights?: Prisma.flightCreateNestedManyWithoutCrewInput;
};
export type crewUncheckedCreateInput = {
    id?: string;
    email: string;
    name?: string | null;
    password: string;
    flights?: Prisma.flightUncheckedCreateNestedManyWithoutCrewInput;
};
export type crewUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    flights?: Prisma.flightUpdateManyWithoutCrewNestedInput;
};
export type crewUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    flights?: Prisma.flightUncheckedUpdateManyWithoutCrewNestedInput;
};
export type crewCreateManyInput = {
    id?: string;
    email: string;
    name?: string | null;
    password: string;
};
export type crewUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type crewUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type crewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
};
export type crewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
};
export type crewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
};
export type CrewScalarRelationFilter = {
    is?: Prisma.crewWhereInput;
    isNot?: Prisma.crewWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type crewCreateNestedOneWithoutFlightsInput = {
    create?: Prisma.XOR<Prisma.crewCreateWithoutFlightsInput, Prisma.crewUncheckedCreateWithoutFlightsInput>;
    connectOrCreate?: Prisma.crewCreateOrConnectWithoutFlightsInput;
    connect?: Prisma.crewWhereUniqueInput;
};
export type crewUpdateOneRequiredWithoutFlightsNestedInput = {
    create?: Prisma.XOR<Prisma.crewCreateWithoutFlightsInput, Prisma.crewUncheckedCreateWithoutFlightsInput>;
    connectOrCreate?: Prisma.crewCreateOrConnectWithoutFlightsInput;
    upsert?: Prisma.crewUpsertWithoutFlightsInput;
    connect?: Prisma.crewWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.crewUpdateToOneWithWhereWithoutFlightsInput, Prisma.crewUpdateWithoutFlightsInput>, Prisma.crewUncheckedUpdateWithoutFlightsInput>;
};
export type crewCreateWithoutFlightsInput = {
    id?: string;
    email: string;
    name?: string | null;
    password: string;
};
export type crewUncheckedCreateWithoutFlightsInput = {
    id?: string;
    email: string;
    name?: string | null;
    password: string;
};
export type crewCreateOrConnectWithoutFlightsInput = {
    where: Prisma.crewWhereUniqueInput;
    create: Prisma.XOR<Prisma.crewCreateWithoutFlightsInput, Prisma.crewUncheckedCreateWithoutFlightsInput>;
};
export type crewUpsertWithoutFlightsInput = {
    update: Prisma.XOR<Prisma.crewUpdateWithoutFlightsInput, Prisma.crewUncheckedUpdateWithoutFlightsInput>;
    create: Prisma.XOR<Prisma.crewCreateWithoutFlightsInput, Prisma.crewUncheckedCreateWithoutFlightsInput>;
    where?: Prisma.crewWhereInput;
};
export type crewUpdateToOneWithWhereWithoutFlightsInput = {
    where?: Prisma.crewWhereInput;
    data: Prisma.XOR<Prisma.crewUpdateWithoutFlightsInput, Prisma.crewUncheckedUpdateWithoutFlightsInput>;
};
export type crewUpdateWithoutFlightsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type crewUncheckedUpdateWithoutFlightsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
};
/**
 * Count Type CrewCountOutputType
 */
export type CrewCountOutputType = {
    flights: number;
};
export type CrewCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    flights?: boolean | CrewCountOutputTypeCountFlightsArgs;
};
/**
 * CrewCountOutputType without action
 */
export type CrewCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrewCountOutputType
     */
    select?: Prisma.CrewCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * CrewCountOutputType without action
 */
export type CrewCountOutputTypeCountFlightsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.flightWhereInput;
};
export type crewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    name?: boolean;
    password?: boolean;
    flights?: boolean | Prisma.crew$flightsArgs<ExtArgs>;
    _count?: boolean | Prisma.CrewCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["crew"]>;
export type crewSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    name?: boolean;
    password?: boolean;
}, ExtArgs["result"]["crew"]>;
export type crewSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    name?: boolean;
    password?: boolean;
}, ExtArgs["result"]["crew"]>;
export type crewSelectScalar = {
    id?: boolean;
    email?: boolean;
    name?: boolean;
    password?: boolean;
};
export type crewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "name" | "password", ExtArgs["result"]["crew"]>;
export type crewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    flights?: boolean | Prisma.crew$flightsArgs<ExtArgs>;
    _count?: boolean | Prisma.CrewCountOutputTypeDefaultArgs<ExtArgs>;
};
export type crewIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type crewIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $crewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "crew";
    objects: {
        flights: Prisma.$flightPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        name: string | null;
        password: string;
    }, ExtArgs["result"]["crew"]>;
    composites: {};
};
export type crewGetPayload<S extends boolean | null | undefined | crewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$crewPayload, S>;
export type crewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<crewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CrewCountAggregateInputType | true;
};
export interface crewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['crew'];
        meta: {
            name: 'crew';
        };
    };
    /**
     * Find zero or one Crew that matches the filter.
     * @param {crewFindUniqueArgs} args - Arguments to find a Crew
     * @example
     * // Get one Crew
     * const crew = await prisma.crew.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends crewFindUniqueArgs>(args: Prisma.SelectSubset<T, crewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__crewClient<runtime.Types.Result.GetResult<Prisma.$crewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Crew that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {crewFindUniqueOrThrowArgs} args - Arguments to find a Crew
     * @example
     * // Get one Crew
     * const crew = await prisma.crew.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends crewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, crewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__crewClient<runtime.Types.Result.GetResult<Prisma.$crewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Crew that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crewFindFirstArgs} args - Arguments to find a Crew
     * @example
     * // Get one Crew
     * const crew = await prisma.crew.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends crewFindFirstArgs>(args?: Prisma.SelectSubset<T, crewFindFirstArgs<ExtArgs>>): Prisma.Prisma__crewClient<runtime.Types.Result.GetResult<Prisma.$crewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Crew that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crewFindFirstOrThrowArgs} args - Arguments to find a Crew
     * @example
     * // Get one Crew
     * const crew = await prisma.crew.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends crewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, crewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__crewClient<runtime.Types.Result.GetResult<Prisma.$crewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Crews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Crews
     * const crews = await prisma.crew.findMany()
     *
     * // Get first 10 Crews
     * const crews = await prisma.crew.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const crewWithIdOnly = await prisma.crew.findMany({ select: { id: true } })
     *
     */
    findMany<T extends crewFindManyArgs>(args?: Prisma.SelectSubset<T, crewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$crewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Crew.
     * @param {crewCreateArgs} args - Arguments to create a Crew.
     * @example
     * // Create one Crew
     * const Crew = await prisma.crew.create({
     *   data: {
     *     // ... data to create a Crew
     *   }
     * })
     *
     */
    create<T extends crewCreateArgs>(args: Prisma.SelectSubset<T, crewCreateArgs<ExtArgs>>): Prisma.Prisma__crewClient<runtime.Types.Result.GetResult<Prisma.$crewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Crews.
     * @param {crewCreateManyArgs} args - Arguments to create many Crews.
     * @example
     * // Create many Crews
     * const crew = await prisma.crew.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends crewCreateManyArgs>(args?: Prisma.SelectSubset<T, crewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Crews and returns the data saved in the database.
     * @param {crewCreateManyAndReturnArgs} args - Arguments to create many Crews.
     * @example
     * // Create many Crews
     * const crew = await prisma.crew.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Crews and only return the `id`
     * const crewWithIdOnly = await prisma.crew.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends crewCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, crewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$crewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Crew.
     * @param {crewDeleteArgs} args - Arguments to delete one Crew.
     * @example
     * // Delete one Crew
     * const Crew = await prisma.crew.delete({
     *   where: {
     *     // ... filter to delete one Crew
     *   }
     * })
     *
     */
    delete<T extends crewDeleteArgs>(args: Prisma.SelectSubset<T, crewDeleteArgs<ExtArgs>>): Prisma.Prisma__crewClient<runtime.Types.Result.GetResult<Prisma.$crewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Crew.
     * @param {crewUpdateArgs} args - Arguments to update one Crew.
     * @example
     * // Update one Crew
     * const crew = await prisma.crew.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends crewUpdateArgs>(args: Prisma.SelectSubset<T, crewUpdateArgs<ExtArgs>>): Prisma.Prisma__crewClient<runtime.Types.Result.GetResult<Prisma.$crewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Crews.
     * @param {crewDeleteManyArgs} args - Arguments to filter Crews to delete.
     * @example
     * // Delete a few Crews
     * const { count } = await prisma.crew.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends crewDeleteManyArgs>(args?: Prisma.SelectSubset<T, crewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Crews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Crews
     * const crew = await prisma.crew.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends crewUpdateManyArgs>(args: Prisma.SelectSubset<T, crewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Crews and returns the data updated in the database.
     * @param {crewUpdateManyAndReturnArgs} args - Arguments to update many Crews.
     * @example
     * // Update many Crews
     * const crew = await prisma.crew.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Crews and only return the `id`
     * const crewWithIdOnly = await prisma.crew.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends crewUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, crewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$crewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Crew.
     * @param {crewUpsertArgs} args - Arguments to update or create a Crew.
     * @example
     * // Update or create a Crew
     * const crew = await prisma.crew.upsert({
     *   create: {
     *     // ... data to create a Crew
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Crew we want to update
     *   }
     * })
     */
    upsert<T extends crewUpsertArgs>(args: Prisma.SelectSubset<T, crewUpsertArgs<ExtArgs>>): Prisma.Prisma__crewClient<runtime.Types.Result.GetResult<Prisma.$crewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Crews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crewCountArgs} args - Arguments to filter Crews to count.
     * @example
     * // Count the number of Crews
     * const count = await prisma.crew.count({
     *   where: {
     *     // ... the filter for the Crews we want to count
     *   }
     * })
    **/
    count<T extends crewCountArgs>(args?: Prisma.Subset<T, crewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CrewCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Crew.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CrewAggregateArgs>(args: Prisma.Subset<T, CrewAggregateArgs>): Prisma.PrismaPromise<GetCrewAggregateType<T>>;
    /**
     * Group by Crew.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {crewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends crewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: crewGroupByArgs['orderBy'];
    } : {
        orderBy?: crewGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, crewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the crew model
     */
    readonly fields: crewFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for crew.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__crewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    flights<T extends Prisma.crew$flightsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.crew$flightsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$flightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the crew model
 */
export interface crewFieldRefs {
    readonly id: Prisma.FieldRef<"crew", 'String'>;
    readonly email: Prisma.FieldRef<"crew", 'String'>;
    readonly name: Prisma.FieldRef<"crew", 'String'>;
    readonly password: Prisma.FieldRef<"crew", 'String'>;
}
/**
 * crew findUnique
 */
export type crewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the crew
     */
    select?: Prisma.crewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the crew
     */
    omit?: Prisma.crewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.crewInclude<ExtArgs> | null;
    /**
     * Filter, which crew to fetch.
     */
    where: Prisma.crewWhereUniqueInput;
};
/**
 * crew findUniqueOrThrow
 */
export type crewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the crew
     */
    select?: Prisma.crewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the crew
     */
    omit?: Prisma.crewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.crewInclude<ExtArgs> | null;
    /**
     * Filter, which crew to fetch.
     */
    where: Prisma.crewWhereUniqueInput;
};
/**
 * crew findFirst
 */
export type crewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the crew
     */
    select?: Prisma.crewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the crew
     */
    omit?: Prisma.crewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.crewInclude<ExtArgs> | null;
    /**
     * Filter, which crew to fetch.
     */
    where?: Prisma.crewWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of crews to fetch.
     */
    orderBy?: Prisma.crewOrderByWithRelationInput | Prisma.crewOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for crews.
     */
    cursor?: Prisma.crewWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` crews from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` crews.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of crews.
     */
    distinct?: Prisma.CrewScalarFieldEnum | Prisma.CrewScalarFieldEnum[];
};
/**
 * crew findFirstOrThrow
 */
export type crewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the crew
     */
    select?: Prisma.crewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the crew
     */
    omit?: Prisma.crewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.crewInclude<ExtArgs> | null;
    /**
     * Filter, which crew to fetch.
     */
    where?: Prisma.crewWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of crews to fetch.
     */
    orderBy?: Prisma.crewOrderByWithRelationInput | Prisma.crewOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for crews.
     */
    cursor?: Prisma.crewWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` crews from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` crews.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of crews.
     */
    distinct?: Prisma.CrewScalarFieldEnum | Prisma.CrewScalarFieldEnum[];
};
/**
 * crew findMany
 */
export type crewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the crew
     */
    select?: Prisma.crewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the crew
     */
    omit?: Prisma.crewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.crewInclude<ExtArgs> | null;
    /**
     * Filter, which crews to fetch.
     */
    where?: Prisma.crewWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of crews to fetch.
     */
    orderBy?: Prisma.crewOrderByWithRelationInput | Prisma.crewOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing crews.
     */
    cursor?: Prisma.crewWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` crews from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` crews.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of crews.
     */
    distinct?: Prisma.CrewScalarFieldEnum | Prisma.CrewScalarFieldEnum[];
};
/**
 * crew create
 */
export type crewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the crew
     */
    select?: Prisma.crewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the crew
     */
    omit?: Prisma.crewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.crewInclude<ExtArgs> | null;
    /**
     * The data needed to create a crew.
     */
    data: Prisma.XOR<Prisma.crewCreateInput, Prisma.crewUncheckedCreateInput>;
};
/**
 * crew createMany
 */
export type crewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many crews.
     */
    data: Prisma.crewCreateManyInput | Prisma.crewCreateManyInput[];
};
/**
 * crew createManyAndReturn
 */
export type crewCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the crew
     */
    select?: Prisma.crewSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the crew
     */
    omit?: Prisma.crewOmit<ExtArgs> | null;
    /**
     * The data used to create many crews.
     */
    data: Prisma.crewCreateManyInput | Prisma.crewCreateManyInput[];
};
/**
 * crew update
 */
export type crewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the crew
     */
    select?: Prisma.crewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the crew
     */
    omit?: Prisma.crewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.crewInclude<ExtArgs> | null;
    /**
     * The data needed to update a crew.
     */
    data: Prisma.XOR<Prisma.crewUpdateInput, Prisma.crewUncheckedUpdateInput>;
    /**
     * Choose, which crew to update.
     */
    where: Prisma.crewWhereUniqueInput;
};
/**
 * crew updateMany
 */
export type crewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update crews.
     */
    data: Prisma.XOR<Prisma.crewUpdateManyMutationInput, Prisma.crewUncheckedUpdateManyInput>;
    /**
     * Filter which crews to update
     */
    where?: Prisma.crewWhereInput;
    /**
     * Limit how many crews to update.
     */
    limit?: number;
};
/**
 * crew updateManyAndReturn
 */
export type crewUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the crew
     */
    select?: Prisma.crewSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the crew
     */
    omit?: Prisma.crewOmit<ExtArgs> | null;
    /**
     * The data used to update crews.
     */
    data: Prisma.XOR<Prisma.crewUpdateManyMutationInput, Prisma.crewUncheckedUpdateManyInput>;
    /**
     * Filter which crews to update
     */
    where?: Prisma.crewWhereInput;
    /**
     * Limit how many crews to update.
     */
    limit?: number;
};
/**
 * crew upsert
 */
export type crewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the crew
     */
    select?: Prisma.crewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the crew
     */
    omit?: Prisma.crewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.crewInclude<ExtArgs> | null;
    /**
     * The filter to search for the crew to update in case it exists.
     */
    where: Prisma.crewWhereUniqueInput;
    /**
     * In case the crew found by the `where` argument doesn't exist, create a new crew with this data.
     */
    create: Prisma.XOR<Prisma.crewCreateInput, Prisma.crewUncheckedCreateInput>;
    /**
     * In case the crew was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.crewUpdateInput, Prisma.crewUncheckedUpdateInput>;
};
/**
 * crew delete
 */
export type crewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the crew
     */
    select?: Prisma.crewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the crew
     */
    omit?: Prisma.crewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.crewInclude<ExtArgs> | null;
    /**
     * Filter which crew to delete.
     */
    where: Prisma.crewWhereUniqueInput;
};
/**
 * crew deleteMany
 */
export type crewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which crews to delete
     */
    where?: Prisma.crewWhereInput;
    /**
     * Limit how many crews to delete.
     */
    limit?: number;
};
/**
 * crew.flights
 */
export type crew$flightsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the flight
     */
    select?: Prisma.flightSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the flight
     */
    omit?: Prisma.flightOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.flightInclude<ExtArgs> | null;
    where?: Prisma.flightWhereInput;
    orderBy?: Prisma.flightOrderByWithRelationInput | Prisma.flightOrderByWithRelationInput[];
    cursor?: Prisma.flightWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FlightScalarFieldEnum | Prisma.FlightScalarFieldEnum[];
};
/**
 * crew without action
 */
export type crewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the crew
     */
    select?: Prisma.crewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the crew
     */
    omit?: Prisma.crewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.crewInclude<ExtArgs> | null;
};
export {};
