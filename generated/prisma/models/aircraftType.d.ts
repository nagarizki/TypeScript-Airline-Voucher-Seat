import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model aircraftType
 *
 */
export type aircraftTypeModel = runtime.Types.Result.DefaultSelection<Prisma.$aircraftTypePayload>;
export type AggregateAircraftType = {
    _count: AircraftTypeCountAggregateOutputType | null;
    _avg: AircraftTypeAvgAggregateOutputType | null;
    _sum: AircraftTypeSumAggregateOutputType | null;
    _min: AircraftTypeMinAggregateOutputType | null;
    _max: AircraftTypeMaxAggregateOutputType | null;
};
export type AircraftTypeAvgAggregateOutputType = {
    seatNumber: number | null;
};
export type AircraftTypeSumAggregateOutputType = {
    seatNumber: number | null;
};
export type AircraftTypeMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    seatType: string | null;
    seatNumber: number | null;
};
export type AircraftTypeMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    seatType: string | null;
    seatNumber: number | null;
};
export type AircraftTypeCountAggregateOutputType = {
    id: number;
    name: number;
    seatType: number;
    seatNumber: number;
    _all: number;
};
export type AircraftTypeAvgAggregateInputType = {
    seatNumber?: true;
};
export type AircraftTypeSumAggregateInputType = {
    seatNumber?: true;
};
export type AircraftTypeMinAggregateInputType = {
    id?: true;
    name?: true;
    seatType?: true;
    seatNumber?: true;
};
export type AircraftTypeMaxAggregateInputType = {
    id?: true;
    name?: true;
    seatType?: true;
    seatNumber?: true;
};
export type AircraftTypeCountAggregateInputType = {
    id?: true;
    name?: true;
    seatType?: true;
    seatNumber?: true;
    _all?: true;
};
export type AircraftTypeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which aircraftType to aggregate.
     */
    where?: Prisma.aircraftTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of aircraftTypes to fetch.
     */
    orderBy?: Prisma.aircraftTypeOrderByWithRelationInput | Prisma.aircraftTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.aircraftTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` aircraftTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` aircraftTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned aircraftTypes
    **/
    _count?: true | AircraftTypeCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: AircraftTypeAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: AircraftTypeSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AircraftTypeMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AircraftTypeMaxAggregateInputType;
};
export type GetAircraftTypeAggregateType<T extends AircraftTypeAggregateArgs> = {
    [P in keyof T & keyof AggregateAircraftType]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAircraftType[P]> : Prisma.GetScalarType<T[P], AggregateAircraftType[P]>;
};
export type aircraftTypeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.aircraftTypeWhereInput;
    orderBy?: Prisma.aircraftTypeOrderByWithAggregationInput | Prisma.aircraftTypeOrderByWithAggregationInput[];
    by: Prisma.AircraftTypeScalarFieldEnum[] | Prisma.AircraftTypeScalarFieldEnum;
    having?: Prisma.aircraftTypeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AircraftTypeCountAggregateInputType | true;
    _avg?: AircraftTypeAvgAggregateInputType;
    _sum?: AircraftTypeSumAggregateInputType;
    _min?: AircraftTypeMinAggregateInputType;
    _max?: AircraftTypeMaxAggregateInputType;
};
export type AircraftTypeGroupByOutputType = {
    id: string;
    name: string;
    seatType: string;
    seatNumber: number;
    _count: AircraftTypeCountAggregateOutputType | null;
    _avg: AircraftTypeAvgAggregateOutputType | null;
    _sum: AircraftTypeSumAggregateOutputType | null;
    _min: AircraftTypeMinAggregateOutputType | null;
    _max: AircraftTypeMaxAggregateOutputType | null;
};
type GetAircraftTypeGroupByPayload<T extends aircraftTypeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AircraftTypeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AircraftTypeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AircraftTypeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AircraftTypeGroupByOutputType[P]>;
}>>;
export type aircraftTypeWhereInput = {
    AND?: Prisma.aircraftTypeWhereInput | Prisma.aircraftTypeWhereInput[];
    OR?: Prisma.aircraftTypeWhereInput[];
    NOT?: Prisma.aircraftTypeWhereInput | Prisma.aircraftTypeWhereInput[];
    id?: Prisma.StringFilter<"aircraftType"> | string;
    name?: Prisma.StringFilter<"aircraftType"> | string;
    seatType?: Prisma.StringFilter<"aircraftType"> | string;
    seatNumber?: Prisma.IntFilter<"aircraftType"> | number;
    seats?: Prisma.SeatListRelationFilter;
    flightAircraftType?: Prisma.FlightAircraftTypeListRelationFilter;
};
export type aircraftTypeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    seatType?: Prisma.SortOrder;
    seatNumber?: Prisma.SortOrder;
    seats?: Prisma.seatOrderByRelationAggregateInput;
    flightAircraftType?: Prisma.flightAircraftTypeOrderByRelationAggregateInput;
};
export type aircraftTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.aircraftTypeWhereInput | Prisma.aircraftTypeWhereInput[];
    OR?: Prisma.aircraftTypeWhereInput[];
    NOT?: Prisma.aircraftTypeWhereInput | Prisma.aircraftTypeWhereInput[];
    name?: Prisma.StringFilter<"aircraftType"> | string;
    seatType?: Prisma.StringFilter<"aircraftType"> | string;
    seatNumber?: Prisma.IntFilter<"aircraftType"> | number;
    seats?: Prisma.SeatListRelationFilter;
    flightAircraftType?: Prisma.FlightAircraftTypeListRelationFilter;
}, "id">;
export type aircraftTypeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    seatType?: Prisma.SortOrder;
    seatNumber?: Prisma.SortOrder;
    _count?: Prisma.aircraftTypeCountOrderByAggregateInput;
    _avg?: Prisma.aircraftTypeAvgOrderByAggregateInput;
    _max?: Prisma.aircraftTypeMaxOrderByAggregateInput;
    _min?: Prisma.aircraftTypeMinOrderByAggregateInput;
    _sum?: Prisma.aircraftTypeSumOrderByAggregateInput;
};
export type aircraftTypeScalarWhereWithAggregatesInput = {
    AND?: Prisma.aircraftTypeScalarWhereWithAggregatesInput | Prisma.aircraftTypeScalarWhereWithAggregatesInput[];
    OR?: Prisma.aircraftTypeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.aircraftTypeScalarWhereWithAggregatesInput | Prisma.aircraftTypeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"aircraftType"> | string;
    name?: Prisma.StringWithAggregatesFilter<"aircraftType"> | string;
    seatType?: Prisma.StringWithAggregatesFilter<"aircraftType"> | string;
    seatNumber?: Prisma.IntWithAggregatesFilter<"aircraftType"> | number;
};
export type aircraftTypeCreateInput = {
    id?: string;
    name: string;
    seatType: string;
    seatNumber: number;
    seats?: Prisma.seatCreateNestedManyWithoutAircraftTypeInput;
    flightAircraftType?: Prisma.flightAircraftTypeCreateNestedManyWithoutAircraftTypeInput;
};
export type aircraftTypeUncheckedCreateInput = {
    id?: string;
    name: string;
    seatType: string;
    seatNumber: number;
    seats?: Prisma.seatUncheckedCreateNestedManyWithoutAircraftTypeInput;
    flightAircraftType?: Prisma.flightAircraftTypeUncheckedCreateNestedManyWithoutAircraftTypeInput;
};
export type aircraftTypeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seats?: Prisma.seatUpdateManyWithoutAircraftTypeNestedInput;
    flightAircraftType?: Prisma.flightAircraftTypeUpdateManyWithoutAircraftTypeNestedInput;
};
export type aircraftTypeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seats?: Prisma.seatUncheckedUpdateManyWithoutAircraftTypeNestedInput;
    flightAircraftType?: Prisma.flightAircraftTypeUncheckedUpdateManyWithoutAircraftTypeNestedInput;
};
export type aircraftTypeCreateManyInput = {
    id?: string;
    name: string;
    seatType: string;
    seatNumber: number;
};
export type aircraftTypeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type aircraftTypeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type aircraftTypeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    seatType?: Prisma.SortOrder;
    seatNumber?: Prisma.SortOrder;
};
export type aircraftTypeAvgOrderByAggregateInput = {
    seatNumber?: Prisma.SortOrder;
};
export type aircraftTypeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    seatType?: Prisma.SortOrder;
    seatNumber?: Prisma.SortOrder;
};
export type aircraftTypeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    seatType?: Prisma.SortOrder;
    seatNumber?: Prisma.SortOrder;
};
export type aircraftTypeSumOrderByAggregateInput = {
    seatNumber?: Prisma.SortOrder;
};
export type AircraftTypeScalarRelationFilter = {
    is?: Prisma.aircraftTypeWhereInput;
    isNot?: Prisma.aircraftTypeWhereInput;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type aircraftTypeCreateNestedOneWithoutFlightAircraftTypeInput = {
    create?: Prisma.XOR<Prisma.aircraftTypeCreateWithoutFlightAircraftTypeInput, Prisma.aircraftTypeUncheckedCreateWithoutFlightAircraftTypeInput>;
    connectOrCreate?: Prisma.aircraftTypeCreateOrConnectWithoutFlightAircraftTypeInput;
    connect?: Prisma.aircraftTypeWhereUniqueInput;
};
export type aircraftTypeUpdateOneRequiredWithoutFlightAircraftTypeNestedInput = {
    create?: Prisma.XOR<Prisma.aircraftTypeCreateWithoutFlightAircraftTypeInput, Prisma.aircraftTypeUncheckedCreateWithoutFlightAircraftTypeInput>;
    connectOrCreate?: Prisma.aircraftTypeCreateOrConnectWithoutFlightAircraftTypeInput;
    upsert?: Prisma.aircraftTypeUpsertWithoutFlightAircraftTypeInput;
    connect?: Prisma.aircraftTypeWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.aircraftTypeUpdateToOneWithWhereWithoutFlightAircraftTypeInput, Prisma.aircraftTypeUpdateWithoutFlightAircraftTypeInput>, Prisma.aircraftTypeUncheckedUpdateWithoutFlightAircraftTypeInput>;
};
export type aircraftTypeCreateNestedOneWithoutSeatsInput = {
    create?: Prisma.XOR<Prisma.aircraftTypeCreateWithoutSeatsInput, Prisma.aircraftTypeUncheckedCreateWithoutSeatsInput>;
    connectOrCreate?: Prisma.aircraftTypeCreateOrConnectWithoutSeatsInput;
    connect?: Prisma.aircraftTypeWhereUniqueInput;
};
export type aircraftTypeUpdateOneRequiredWithoutSeatsNestedInput = {
    create?: Prisma.XOR<Prisma.aircraftTypeCreateWithoutSeatsInput, Prisma.aircraftTypeUncheckedCreateWithoutSeatsInput>;
    connectOrCreate?: Prisma.aircraftTypeCreateOrConnectWithoutSeatsInput;
    upsert?: Prisma.aircraftTypeUpsertWithoutSeatsInput;
    connect?: Prisma.aircraftTypeWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.aircraftTypeUpdateToOneWithWhereWithoutSeatsInput, Prisma.aircraftTypeUpdateWithoutSeatsInput>, Prisma.aircraftTypeUncheckedUpdateWithoutSeatsInput>;
};
export type aircraftTypeCreateWithoutFlightAircraftTypeInput = {
    id?: string;
    name: string;
    seatType: string;
    seatNumber: number;
    seats?: Prisma.seatCreateNestedManyWithoutAircraftTypeInput;
};
export type aircraftTypeUncheckedCreateWithoutFlightAircraftTypeInput = {
    id?: string;
    name: string;
    seatType: string;
    seatNumber: number;
    seats?: Prisma.seatUncheckedCreateNestedManyWithoutAircraftTypeInput;
};
export type aircraftTypeCreateOrConnectWithoutFlightAircraftTypeInput = {
    where: Prisma.aircraftTypeWhereUniqueInput;
    create: Prisma.XOR<Prisma.aircraftTypeCreateWithoutFlightAircraftTypeInput, Prisma.aircraftTypeUncheckedCreateWithoutFlightAircraftTypeInput>;
};
export type aircraftTypeUpsertWithoutFlightAircraftTypeInput = {
    update: Prisma.XOR<Prisma.aircraftTypeUpdateWithoutFlightAircraftTypeInput, Prisma.aircraftTypeUncheckedUpdateWithoutFlightAircraftTypeInput>;
    create: Prisma.XOR<Prisma.aircraftTypeCreateWithoutFlightAircraftTypeInput, Prisma.aircraftTypeUncheckedCreateWithoutFlightAircraftTypeInput>;
    where?: Prisma.aircraftTypeWhereInput;
};
export type aircraftTypeUpdateToOneWithWhereWithoutFlightAircraftTypeInput = {
    where?: Prisma.aircraftTypeWhereInput;
    data: Prisma.XOR<Prisma.aircraftTypeUpdateWithoutFlightAircraftTypeInput, Prisma.aircraftTypeUncheckedUpdateWithoutFlightAircraftTypeInput>;
};
export type aircraftTypeUpdateWithoutFlightAircraftTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seats?: Prisma.seatUpdateManyWithoutAircraftTypeNestedInput;
};
export type aircraftTypeUncheckedUpdateWithoutFlightAircraftTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seats?: Prisma.seatUncheckedUpdateManyWithoutAircraftTypeNestedInput;
};
export type aircraftTypeCreateWithoutSeatsInput = {
    id?: string;
    name: string;
    seatType: string;
    seatNumber: number;
    flightAircraftType?: Prisma.flightAircraftTypeCreateNestedManyWithoutAircraftTypeInput;
};
export type aircraftTypeUncheckedCreateWithoutSeatsInput = {
    id?: string;
    name: string;
    seatType: string;
    seatNumber: number;
    flightAircraftType?: Prisma.flightAircraftTypeUncheckedCreateNestedManyWithoutAircraftTypeInput;
};
export type aircraftTypeCreateOrConnectWithoutSeatsInput = {
    where: Prisma.aircraftTypeWhereUniqueInput;
    create: Prisma.XOR<Prisma.aircraftTypeCreateWithoutSeatsInput, Prisma.aircraftTypeUncheckedCreateWithoutSeatsInput>;
};
export type aircraftTypeUpsertWithoutSeatsInput = {
    update: Prisma.XOR<Prisma.aircraftTypeUpdateWithoutSeatsInput, Prisma.aircraftTypeUncheckedUpdateWithoutSeatsInput>;
    create: Prisma.XOR<Prisma.aircraftTypeCreateWithoutSeatsInput, Prisma.aircraftTypeUncheckedCreateWithoutSeatsInput>;
    where?: Prisma.aircraftTypeWhereInput;
};
export type aircraftTypeUpdateToOneWithWhereWithoutSeatsInput = {
    where?: Prisma.aircraftTypeWhereInput;
    data: Prisma.XOR<Prisma.aircraftTypeUpdateWithoutSeatsInput, Prisma.aircraftTypeUncheckedUpdateWithoutSeatsInput>;
};
export type aircraftTypeUpdateWithoutSeatsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    flightAircraftType?: Prisma.flightAircraftTypeUpdateManyWithoutAircraftTypeNestedInput;
};
export type aircraftTypeUncheckedUpdateWithoutSeatsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    flightAircraftType?: Prisma.flightAircraftTypeUncheckedUpdateManyWithoutAircraftTypeNestedInput;
};
/**
 * Count Type AircraftTypeCountOutputType
 */
export type AircraftTypeCountOutputType = {
    seats: number;
    flightAircraftType: number;
};
export type AircraftTypeCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    seats?: boolean | AircraftTypeCountOutputTypeCountSeatsArgs;
    flightAircraftType?: boolean | AircraftTypeCountOutputTypeCountFlightAircraftTypeArgs;
};
/**
 * AircraftTypeCountOutputType without action
 */
export type AircraftTypeCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftTypeCountOutputType
     */
    select?: Prisma.AircraftTypeCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * AircraftTypeCountOutputType without action
 */
export type AircraftTypeCountOutputTypeCountSeatsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.seatWhereInput;
};
/**
 * AircraftTypeCountOutputType without action
 */
export type AircraftTypeCountOutputTypeCountFlightAircraftTypeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.flightAircraftTypeWhereInput;
};
export type aircraftTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    seatType?: boolean;
    seatNumber?: boolean;
    seats?: boolean | Prisma.aircraftType$seatsArgs<ExtArgs>;
    flightAircraftType?: boolean | Prisma.aircraftType$flightAircraftTypeArgs<ExtArgs>;
    _count?: boolean | Prisma.AircraftTypeCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aircraftType"]>;
export type aircraftTypeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    seatType?: boolean;
    seatNumber?: boolean;
}, ExtArgs["result"]["aircraftType"]>;
export type aircraftTypeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    seatType?: boolean;
    seatNumber?: boolean;
}, ExtArgs["result"]["aircraftType"]>;
export type aircraftTypeSelectScalar = {
    id?: boolean;
    name?: boolean;
    seatType?: boolean;
    seatNumber?: boolean;
};
export type aircraftTypeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "seatType" | "seatNumber", ExtArgs["result"]["aircraftType"]>;
export type aircraftTypeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    seats?: boolean | Prisma.aircraftType$seatsArgs<ExtArgs>;
    flightAircraftType?: boolean | Prisma.aircraftType$flightAircraftTypeArgs<ExtArgs>;
    _count?: boolean | Prisma.AircraftTypeCountOutputTypeDefaultArgs<ExtArgs>;
};
export type aircraftTypeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type aircraftTypeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $aircraftTypePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "aircraftType";
    objects: {
        seats: Prisma.$seatPayload<ExtArgs>[];
        flightAircraftType: Prisma.$flightAircraftTypePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        seatType: string;
        seatNumber: number;
    }, ExtArgs["result"]["aircraftType"]>;
    composites: {};
};
export type aircraftTypeGetPayload<S extends boolean | null | undefined | aircraftTypeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload, S>;
export type aircraftTypeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<aircraftTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AircraftTypeCountAggregateInputType | true;
};
export interface aircraftTypeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['aircraftType'];
        meta: {
            name: 'aircraftType';
        };
    };
    /**
     * Find zero or one AircraftType that matches the filter.
     * @param {aircraftTypeFindUniqueArgs} args - Arguments to find a AircraftType
     * @example
     * // Get one AircraftType
     * const aircraftType = await prisma.aircraftType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends aircraftTypeFindUniqueArgs>(args: Prisma.SelectSubset<T, aircraftTypeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__aircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one AircraftType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {aircraftTypeFindUniqueOrThrowArgs} args - Arguments to find a AircraftType
     * @example
     * // Get one AircraftType
     * const aircraftType = await prisma.aircraftType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends aircraftTypeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, aircraftTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__aircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AircraftType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {aircraftTypeFindFirstArgs} args - Arguments to find a AircraftType
     * @example
     * // Get one AircraftType
     * const aircraftType = await prisma.aircraftType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends aircraftTypeFindFirstArgs>(args?: Prisma.SelectSubset<T, aircraftTypeFindFirstArgs<ExtArgs>>): Prisma.Prisma__aircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AircraftType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {aircraftTypeFindFirstOrThrowArgs} args - Arguments to find a AircraftType
     * @example
     * // Get one AircraftType
     * const aircraftType = await prisma.aircraftType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends aircraftTypeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, aircraftTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__aircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more AircraftTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {aircraftTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AircraftTypes
     * const aircraftTypes = await prisma.aircraftType.findMany()
     *
     * // Get first 10 AircraftTypes
     * const aircraftTypes = await prisma.aircraftType.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const aircraftTypeWithIdOnly = await prisma.aircraftType.findMany({ select: { id: true } })
     *
     */
    findMany<T extends aircraftTypeFindManyArgs>(args?: Prisma.SelectSubset<T, aircraftTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a AircraftType.
     * @param {aircraftTypeCreateArgs} args - Arguments to create a AircraftType.
     * @example
     * // Create one AircraftType
     * const AircraftType = await prisma.aircraftType.create({
     *   data: {
     *     // ... data to create a AircraftType
     *   }
     * })
     *
     */
    create<T extends aircraftTypeCreateArgs>(args: Prisma.SelectSubset<T, aircraftTypeCreateArgs<ExtArgs>>): Prisma.Prisma__aircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many AircraftTypes.
     * @param {aircraftTypeCreateManyArgs} args - Arguments to create many AircraftTypes.
     * @example
     * // Create many AircraftTypes
     * const aircraftType = await prisma.aircraftType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends aircraftTypeCreateManyArgs>(args?: Prisma.SelectSubset<T, aircraftTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many AircraftTypes and returns the data saved in the database.
     * @param {aircraftTypeCreateManyAndReturnArgs} args - Arguments to create many AircraftTypes.
     * @example
     * // Create many AircraftTypes
     * const aircraftType = await prisma.aircraftType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AircraftTypes and only return the `id`
     * const aircraftTypeWithIdOnly = await prisma.aircraftType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends aircraftTypeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, aircraftTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a AircraftType.
     * @param {aircraftTypeDeleteArgs} args - Arguments to delete one AircraftType.
     * @example
     * // Delete one AircraftType
     * const AircraftType = await prisma.aircraftType.delete({
     *   where: {
     *     // ... filter to delete one AircraftType
     *   }
     * })
     *
     */
    delete<T extends aircraftTypeDeleteArgs>(args: Prisma.SelectSubset<T, aircraftTypeDeleteArgs<ExtArgs>>): Prisma.Prisma__aircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one AircraftType.
     * @param {aircraftTypeUpdateArgs} args - Arguments to update one AircraftType.
     * @example
     * // Update one AircraftType
     * const aircraftType = await prisma.aircraftType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends aircraftTypeUpdateArgs>(args: Prisma.SelectSubset<T, aircraftTypeUpdateArgs<ExtArgs>>): Prisma.Prisma__aircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more AircraftTypes.
     * @param {aircraftTypeDeleteManyArgs} args - Arguments to filter AircraftTypes to delete.
     * @example
     * // Delete a few AircraftTypes
     * const { count } = await prisma.aircraftType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends aircraftTypeDeleteManyArgs>(args?: Prisma.SelectSubset<T, aircraftTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AircraftTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {aircraftTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AircraftTypes
     * const aircraftType = await prisma.aircraftType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends aircraftTypeUpdateManyArgs>(args: Prisma.SelectSubset<T, aircraftTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AircraftTypes and returns the data updated in the database.
     * @param {aircraftTypeUpdateManyAndReturnArgs} args - Arguments to update many AircraftTypes.
     * @example
     * // Update many AircraftTypes
     * const aircraftType = await prisma.aircraftType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AircraftTypes and only return the `id`
     * const aircraftTypeWithIdOnly = await prisma.aircraftType.updateManyAndReturn({
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
    updateManyAndReturn<T extends aircraftTypeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, aircraftTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one AircraftType.
     * @param {aircraftTypeUpsertArgs} args - Arguments to update or create a AircraftType.
     * @example
     * // Update or create a AircraftType
     * const aircraftType = await prisma.aircraftType.upsert({
     *   create: {
     *     // ... data to create a AircraftType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AircraftType we want to update
     *   }
     * })
     */
    upsert<T extends aircraftTypeUpsertArgs>(args: Prisma.SelectSubset<T, aircraftTypeUpsertArgs<ExtArgs>>): Prisma.Prisma__aircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of AircraftTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {aircraftTypeCountArgs} args - Arguments to filter AircraftTypes to count.
     * @example
     * // Count the number of AircraftTypes
     * const count = await prisma.aircraftType.count({
     *   where: {
     *     // ... the filter for the AircraftTypes we want to count
     *   }
     * })
    **/
    count<T extends aircraftTypeCountArgs>(args?: Prisma.Subset<T, aircraftTypeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AircraftTypeCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a AircraftType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AircraftTypeAggregateArgs>(args: Prisma.Subset<T, AircraftTypeAggregateArgs>): Prisma.PrismaPromise<GetAircraftTypeAggregateType<T>>;
    /**
     * Group by AircraftType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {aircraftTypeGroupByArgs} args - Group by arguments.
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
    groupBy<T extends aircraftTypeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: aircraftTypeGroupByArgs['orderBy'];
    } : {
        orderBy?: aircraftTypeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, aircraftTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAircraftTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the aircraftType model
     */
    readonly fields: aircraftTypeFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for aircraftType.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__aircraftTypeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    seats<T extends Prisma.aircraftType$seatsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.aircraftType$seatsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$seatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    flightAircraftType<T extends Prisma.aircraftType$flightAircraftTypeArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.aircraftType$flightAircraftTypeArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the aircraftType model
 */
export interface aircraftTypeFieldRefs {
    readonly id: Prisma.FieldRef<"aircraftType", 'String'>;
    readonly name: Prisma.FieldRef<"aircraftType", 'String'>;
    readonly seatType: Prisma.FieldRef<"aircraftType", 'String'>;
    readonly seatNumber: Prisma.FieldRef<"aircraftType", 'Int'>;
}
/**
 * aircraftType findUnique
 */
export type aircraftTypeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the aircraftType
     */
    select?: Prisma.aircraftTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the aircraftType
     */
    omit?: Prisma.aircraftTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.aircraftTypeInclude<ExtArgs> | null;
    /**
     * Filter, which aircraftType to fetch.
     */
    where: Prisma.aircraftTypeWhereUniqueInput;
};
/**
 * aircraftType findUniqueOrThrow
 */
export type aircraftTypeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the aircraftType
     */
    select?: Prisma.aircraftTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the aircraftType
     */
    omit?: Prisma.aircraftTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.aircraftTypeInclude<ExtArgs> | null;
    /**
     * Filter, which aircraftType to fetch.
     */
    where: Prisma.aircraftTypeWhereUniqueInput;
};
/**
 * aircraftType findFirst
 */
export type aircraftTypeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the aircraftType
     */
    select?: Prisma.aircraftTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the aircraftType
     */
    omit?: Prisma.aircraftTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.aircraftTypeInclude<ExtArgs> | null;
    /**
     * Filter, which aircraftType to fetch.
     */
    where?: Prisma.aircraftTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of aircraftTypes to fetch.
     */
    orderBy?: Prisma.aircraftTypeOrderByWithRelationInput | Prisma.aircraftTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for aircraftTypes.
     */
    cursor?: Prisma.aircraftTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` aircraftTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` aircraftTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of aircraftTypes.
     */
    distinct?: Prisma.AircraftTypeScalarFieldEnum | Prisma.AircraftTypeScalarFieldEnum[];
};
/**
 * aircraftType findFirstOrThrow
 */
export type aircraftTypeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the aircraftType
     */
    select?: Prisma.aircraftTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the aircraftType
     */
    omit?: Prisma.aircraftTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.aircraftTypeInclude<ExtArgs> | null;
    /**
     * Filter, which aircraftType to fetch.
     */
    where?: Prisma.aircraftTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of aircraftTypes to fetch.
     */
    orderBy?: Prisma.aircraftTypeOrderByWithRelationInput | Prisma.aircraftTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for aircraftTypes.
     */
    cursor?: Prisma.aircraftTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` aircraftTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` aircraftTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of aircraftTypes.
     */
    distinct?: Prisma.AircraftTypeScalarFieldEnum | Prisma.AircraftTypeScalarFieldEnum[];
};
/**
 * aircraftType findMany
 */
export type aircraftTypeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the aircraftType
     */
    select?: Prisma.aircraftTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the aircraftType
     */
    omit?: Prisma.aircraftTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.aircraftTypeInclude<ExtArgs> | null;
    /**
     * Filter, which aircraftTypes to fetch.
     */
    where?: Prisma.aircraftTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of aircraftTypes to fetch.
     */
    orderBy?: Prisma.aircraftTypeOrderByWithRelationInput | Prisma.aircraftTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing aircraftTypes.
     */
    cursor?: Prisma.aircraftTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` aircraftTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` aircraftTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of aircraftTypes.
     */
    distinct?: Prisma.AircraftTypeScalarFieldEnum | Prisma.AircraftTypeScalarFieldEnum[];
};
/**
 * aircraftType create
 */
export type aircraftTypeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the aircraftType
     */
    select?: Prisma.aircraftTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the aircraftType
     */
    omit?: Prisma.aircraftTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.aircraftTypeInclude<ExtArgs> | null;
    /**
     * The data needed to create a aircraftType.
     */
    data: Prisma.XOR<Prisma.aircraftTypeCreateInput, Prisma.aircraftTypeUncheckedCreateInput>;
};
/**
 * aircraftType createMany
 */
export type aircraftTypeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many aircraftTypes.
     */
    data: Prisma.aircraftTypeCreateManyInput | Prisma.aircraftTypeCreateManyInput[];
};
/**
 * aircraftType createManyAndReturn
 */
export type aircraftTypeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the aircraftType
     */
    select?: Prisma.aircraftTypeSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the aircraftType
     */
    omit?: Prisma.aircraftTypeOmit<ExtArgs> | null;
    /**
     * The data used to create many aircraftTypes.
     */
    data: Prisma.aircraftTypeCreateManyInput | Prisma.aircraftTypeCreateManyInput[];
};
/**
 * aircraftType update
 */
export type aircraftTypeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the aircraftType
     */
    select?: Prisma.aircraftTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the aircraftType
     */
    omit?: Prisma.aircraftTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.aircraftTypeInclude<ExtArgs> | null;
    /**
     * The data needed to update a aircraftType.
     */
    data: Prisma.XOR<Prisma.aircraftTypeUpdateInput, Prisma.aircraftTypeUncheckedUpdateInput>;
    /**
     * Choose, which aircraftType to update.
     */
    where: Prisma.aircraftTypeWhereUniqueInput;
};
/**
 * aircraftType updateMany
 */
export type aircraftTypeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update aircraftTypes.
     */
    data: Prisma.XOR<Prisma.aircraftTypeUpdateManyMutationInput, Prisma.aircraftTypeUncheckedUpdateManyInput>;
    /**
     * Filter which aircraftTypes to update
     */
    where?: Prisma.aircraftTypeWhereInput;
    /**
     * Limit how many aircraftTypes to update.
     */
    limit?: number;
};
/**
 * aircraftType updateManyAndReturn
 */
export type aircraftTypeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the aircraftType
     */
    select?: Prisma.aircraftTypeSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the aircraftType
     */
    omit?: Prisma.aircraftTypeOmit<ExtArgs> | null;
    /**
     * The data used to update aircraftTypes.
     */
    data: Prisma.XOR<Prisma.aircraftTypeUpdateManyMutationInput, Prisma.aircraftTypeUncheckedUpdateManyInput>;
    /**
     * Filter which aircraftTypes to update
     */
    where?: Prisma.aircraftTypeWhereInput;
    /**
     * Limit how many aircraftTypes to update.
     */
    limit?: number;
};
/**
 * aircraftType upsert
 */
export type aircraftTypeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the aircraftType
     */
    select?: Prisma.aircraftTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the aircraftType
     */
    omit?: Prisma.aircraftTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.aircraftTypeInclude<ExtArgs> | null;
    /**
     * The filter to search for the aircraftType to update in case it exists.
     */
    where: Prisma.aircraftTypeWhereUniqueInput;
    /**
     * In case the aircraftType found by the `where` argument doesn't exist, create a new aircraftType with this data.
     */
    create: Prisma.XOR<Prisma.aircraftTypeCreateInput, Prisma.aircraftTypeUncheckedCreateInput>;
    /**
     * In case the aircraftType was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.aircraftTypeUpdateInput, Prisma.aircraftTypeUncheckedUpdateInput>;
};
/**
 * aircraftType delete
 */
export type aircraftTypeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the aircraftType
     */
    select?: Prisma.aircraftTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the aircraftType
     */
    omit?: Prisma.aircraftTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.aircraftTypeInclude<ExtArgs> | null;
    /**
     * Filter which aircraftType to delete.
     */
    where: Prisma.aircraftTypeWhereUniqueInput;
};
/**
 * aircraftType deleteMany
 */
export type aircraftTypeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which aircraftTypes to delete
     */
    where?: Prisma.aircraftTypeWhereInput;
    /**
     * Limit how many aircraftTypes to delete.
     */
    limit?: number;
};
/**
 * aircraftType.seats
 */
export type aircraftType$seatsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the seat
     */
    select?: Prisma.seatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the seat
     */
    omit?: Prisma.seatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.seatInclude<ExtArgs> | null;
    where?: Prisma.seatWhereInput;
    orderBy?: Prisma.seatOrderByWithRelationInput | Prisma.seatOrderByWithRelationInput[];
    cursor?: Prisma.seatWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SeatScalarFieldEnum | Prisma.SeatScalarFieldEnum[];
};
/**
 * aircraftType.flightAircraftType
 */
export type aircraftType$flightAircraftTypeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the flightAircraftType
     */
    select?: Prisma.flightAircraftTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the flightAircraftType
     */
    omit?: Prisma.flightAircraftTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.flightAircraftTypeInclude<ExtArgs> | null;
    where?: Prisma.flightAircraftTypeWhereInput;
    orderBy?: Prisma.flightAircraftTypeOrderByWithRelationInput | Prisma.flightAircraftTypeOrderByWithRelationInput[];
    cursor?: Prisma.flightAircraftTypeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FlightAircraftTypeScalarFieldEnum | Prisma.FlightAircraftTypeScalarFieldEnum[];
};
/**
 * aircraftType without action
 */
export type aircraftTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the aircraftType
     */
    select?: Prisma.aircraftTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the aircraftType
     */
    omit?: Prisma.aircraftTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.aircraftTypeInclude<ExtArgs> | null;
};
export {};
