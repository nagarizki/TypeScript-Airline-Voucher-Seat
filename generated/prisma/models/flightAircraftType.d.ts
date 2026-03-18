import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model flightAircraftType
 *
 */
export type flightAircraftTypeModel = runtime.Types.Result.DefaultSelection<Prisma.$flightAircraftTypePayload>;
export type AggregateFlightAircraftType = {
    _count: FlightAircraftTypeCountAggregateOutputType | null;
    _min: FlightAircraftTypeMinAggregateOutputType | null;
    _max: FlightAircraftTypeMaxAggregateOutputType | null;
};
export type FlightAircraftTypeMinAggregateOutputType = {
    id: string | null;
    flightId: string | null;
    aircraftTypeId: string | null;
};
export type FlightAircraftTypeMaxAggregateOutputType = {
    id: string | null;
    flightId: string | null;
    aircraftTypeId: string | null;
};
export type FlightAircraftTypeCountAggregateOutputType = {
    id: number;
    flightId: number;
    aircraftTypeId: number;
    _all: number;
};
export type FlightAircraftTypeMinAggregateInputType = {
    id?: true;
    flightId?: true;
    aircraftTypeId?: true;
};
export type FlightAircraftTypeMaxAggregateInputType = {
    id?: true;
    flightId?: true;
    aircraftTypeId?: true;
};
export type FlightAircraftTypeCountAggregateInputType = {
    id?: true;
    flightId?: true;
    aircraftTypeId?: true;
    _all?: true;
};
export type FlightAircraftTypeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which flightAircraftType to aggregate.
     */
    where?: Prisma.flightAircraftTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of flightAircraftTypes to fetch.
     */
    orderBy?: Prisma.flightAircraftTypeOrderByWithRelationInput | Prisma.flightAircraftTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.flightAircraftTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` flightAircraftTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` flightAircraftTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned flightAircraftTypes
    **/
    _count?: true | FlightAircraftTypeCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FlightAircraftTypeMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FlightAircraftTypeMaxAggregateInputType;
};
export type GetFlightAircraftTypeAggregateType<T extends FlightAircraftTypeAggregateArgs> = {
    [P in keyof T & keyof AggregateFlightAircraftType]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFlightAircraftType[P]> : Prisma.GetScalarType<T[P], AggregateFlightAircraftType[P]>;
};
export type flightAircraftTypeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.flightAircraftTypeWhereInput;
    orderBy?: Prisma.flightAircraftTypeOrderByWithAggregationInput | Prisma.flightAircraftTypeOrderByWithAggregationInput[];
    by: Prisma.FlightAircraftTypeScalarFieldEnum[] | Prisma.FlightAircraftTypeScalarFieldEnum;
    having?: Prisma.flightAircraftTypeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FlightAircraftTypeCountAggregateInputType | true;
    _min?: FlightAircraftTypeMinAggregateInputType;
    _max?: FlightAircraftTypeMaxAggregateInputType;
};
export type FlightAircraftTypeGroupByOutputType = {
    id: string;
    flightId: string;
    aircraftTypeId: string;
    _count: FlightAircraftTypeCountAggregateOutputType | null;
    _min: FlightAircraftTypeMinAggregateOutputType | null;
    _max: FlightAircraftTypeMaxAggregateOutputType | null;
};
type GetFlightAircraftTypeGroupByPayload<T extends flightAircraftTypeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FlightAircraftTypeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FlightAircraftTypeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FlightAircraftTypeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FlightAircraftTypeGroupByOutputType[P]>;
}>>;
export type flightAircraftTypeWhereInput = {
    AND?: Prisma.flightAircraftTypeWhereInput | Prisma.flightAircraftTypeWhereInput[];
    OR?: Prisma.flightAircraftTypeWhereInput[];
    NOT?: Prisma.flightAircraftTypeWhereInput | Prisma.flightAircraftTypeWhereInput[];
    id?: Prisma.StringFilter<"flightAircraftType"> | string;
    flightId?: Prisma.StringFilter<"flightAircraftType"> | string;
    aircraftTypeId?: Prisma.StringFilter<"flightAircraftType"> | string;
    flight?: Prisma.XOR<Prisma.FlightScalarRelationFilter, Prisma.flightWhereInput>;
    aircraftType?: Prisma.XOR<Prisma.AircraftTypeScalarRelationFilter, Prisma.aircraftTypeWhereInput>;
};
export type flightAircraftTypeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    flightId?: Prisma.SortOrder;
    aircraftTypeId?: Prisma.SortOrder;
    flight?: Prisma.flightOrderByWithRelationInput;
    aircraftType?: Prisma.aircraftTypeOrderByWithRelationInput;
};
export type flightAircraftTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.flightAircraftTypeWhereInput | Prisma.flightAircraftTypeWhereInput[];
    OR?: Prisma.flightAircraftTypeWhereInput[];
    NOT?: Prisma.flightAircraftTypeWhereInput | Prisma.flightAircraftTypeWhereInput[];
    flightId?: Prisma.StringFilter<"flightAircraftType"> | string;
    aircraftTypeId?: Prisma.StringFilter<"flightAircraftType"> | string;
    flight?: Prisma.XOR<Prisma.FlightScalarRelationFilter, Prisma.flightWhereInput>;
    aircraftType?: Prisma.XOR<Prisma.AircraftTypeScalarRelationFilter, Prisma.aircraftTypeWhereInput>;
}, "id">;
export type flightAircraftTypeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    flightId?: Prisma.SortOrder;
    aircraftTypeId?: Prisma.SortOrder;
    _count?: Prisma.flightAircraftTypeCountOrderByAggregateInput;
    _max?: Prisma.flightAircraftTypeMaxOrderByAggregateInput;
    _min?: Prisma.flightAircraftTypeMinOrderByAggregateInput;
};
export type flightAircraftTypeScalarWhereWithAggregatesInput = {
    AND?: Prisma.flightAircraftTypeScalarWhereWithAggregatesInput | Prisma.flightAircraftTypeScalarWhereWithAggregatesInput[];
    OR?: Prisma.flightAircraftTypeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.flightAircraftTypeScalarWhereWithAggregatesInput | Prisma.flightAircraftTypeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"flightAircraftType"> | string;
    flightId?: Prisma.StringWithAggregatesFilter<"flightAircraftType"> | string;
    aircraftTypeId?: Prisma.StringWithAggregatesFilter<"flightAircraftType"> | string;
};
export type flightAircraftTypeCreateInput = {
    id?: string;
    flight: Prisma.flightCreateNestedOneWithoutFlightAircraftTypeInput;
    aircraftType: Prisma.aircraftTypeCreateNestedOneWithoutFlightAircraftTypeInput;
};
export type flightAircraftTypeUncheckedCreateInput = {
    id?: string;
    flightId: string;
    aircraftTypeId: string;
};
export type flightAircraftTypeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flight?: Prisma.flightUpdateOneRequiredWithoutFlightAircraftTypeNestedInput;
    aircraftType?: Prisma.aircraftTypeUpdateOneRequiredWithoutFlightAircraftTypeNestedInput;
};
export type flightAircraftTypeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flightId?: Prisma.StringFieldUpdateOperationsInput | string;
    aircraftTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type flightAircraftTypeCreateManyInput = {
    id?: string;
    flightId: string;
    aircraftTypeId: string;
};
export type flightAircraftTypeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type flightAircraftTypeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flightId?: Prisma.StringFieldUpdateOperationsInput | string;
    aircraftTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type FlightAircraftTypeListRelationFilter = {
    every?: Prisma.flightAircraftTypeWhereInput;
    some?: Prisma.flightAircraftTypeWhereInput;
    none?: Prisma.flightAircraftTypeWhereInput;
};
export type flightAircraftTypeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type flightAircraftTypeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flightId?: Prisma.SortOrder;
    aircraftTypeId?: Prisma.SortOrder;
};
export type flightAircraftTypeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flightId?: Prisma.SortOrder;
    aircraftTypeId?: Prisma.SortOrder;
};
export type flightAircraftTypeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    flightId?: Prisma.SortOrder;
    aircraftTypeId?: Prisma.SortOrder;
};
export type flightAircraftTypeCreateNestedManyWithoutAircraftTypeInput = {
    create?: Prisma.XOR<Prisma.flightAircraftTypeCreateWithoutAircraftTypeInput, Prisma.flightAircraftTypeUncheckedCreateWithoutAircraftTypeInput> | Prisma.flightAircraftTypeCreateWithoutAircraftTypeInput[] | Prisma.flightAircraftTypeUncheckedCreateWithoutAircraftTypeInput[];
    connectOrCreate?: Prisma.flightAircraftTypeCreateOrConnectWithoutAircraftTypeInput | Prisma.flightAircraftTypeCreateOrConnectWithoutAircraftTypeInput[];
    createMany?: Prisma.flightAircraftTypeCreateManyAircraftTypeInputEnvelope;
    connect?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
};
export type flightAircraftTypeUncheckedCreateNestedManyWithoutAircraftTypeInput = {
    create?: Prisma.XOR<Prisma.flightAircraftTypeCreateWithoutAircraftTypeInput, Prisma.flightAircraftTypeUncheckedCreateWithoutAircraftTypeInput> | Prisma.flightAircraftTypeCreateWithoutAircraftTypeInput[] | Prisma.flightAircraftTypeUncheckedCreateWithoutAircraftTypeInput[];
    connectOrCreate?: Prisma.flightAircraftTypeCreateOrConnectWithoutAircraftTypeInput | Prisma.flightAircraftTypeCreateOrConnectWithoutAircraftTypeInput[];
    createMany?: Prisma.flightAircraftTypeCreateManyAircraftTypeInputEnvelope;
    connect?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
};
export type flightAircraftTypeUpdateManyWithoutAircraftTypeNestedInput = {
    create?: Prisma.XOR<Prisma.flightAircraftTypeCreateWithoutAircraftTypeInput, Prisma.flightAircraftTypeUncheckedCreateWithoutAircraftTypeInput> | Prisma.flightAircraftTypeCreateWithoutAircraftTypeInput[] | Prisma.flightAircraftTypeUncheckedCreateWithoutAircraftTypeInput[];
    connectOrCreate?: Prisma.flightAircraftTypeCreateOrConnectWithoutAircraftTypeInput | Prisma.flightAircraftTypeCreateOrConnectWithoutAircraftTypeInput[];
    upsert?: Prisma.flightAircraftTypeUpsertWithWhereUniqueWithoutAircraftTypeInput | Prisma.flightAircraftTypeUpsertWithWhereUniqueWithoutAircraftTypeInput[];
    createMany?: Prisma.flightAircraftTypeCreateManyAircraftTypeInputEnvelope;
    set?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    disconnect?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    delete?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    connect?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    update?: Prisma.flightAircraftTypeUpdateWithWhereUniqueWithoutAircraftTypeInput | Prisma.flightAircraftTypeUpdateWithWhereUniqueWithoutAircraftTypeInput[];
    updateMany?: Prisma.flightAircraftTypeUpdateManyWithWhereWithoutAircraftTypeInput | Prisma.flightAircraftTypeUpdateManyWithWhereWithoutAircraftTypeInput[];
    deleteMany?: Prisma.flightAircraftTypeScalarWhereInput | Prisma.flightAircraftTypeScalarWhereInput[];
};
export type flightAircraftTypeUncheckedUpdateManyWithoutAircraftTypeNestedInput = {
    create?: Prisma.XOR<Prisma.flightAircraftTypeCreateWithoutAircraftTypeInput, Prisma.flightAircraftTypeUncheckedCreateWithoutAircraftTypeInput> | Prisma.flightAircraftTypeCreateWithoutAircraftTypeInput[] | Prisma.flightAircraftTypeUncheckedCreateWithoutAircraftTypeInput[];
    connectOrCreate?: Prisma.flightAircraftTypeCreateOrConnectWithoutAircraftTypeInput | Prisma.flightAircraftTypeCreateOrConnectWithoutAircraftTypeInput[];
    upsert?: Prisma.flightAircraftTypeUpsertWithWhereUniqueWithoutAircraftTypeInput | Prisma.flightAircraftTypeUpsertWithWhereUniqueWithoutAircraftTypeInput[];
    createMany?: Prisma.flightAircraftTypeCreateManyAircraftTypeInputEnvelope;
    set?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    disconnect?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    delete?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    connect?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    update?: Prisma.flightAircraftTypeUpdateWithWhereUniqueWithoutAircraftTypeInput | Prisma.flightAircraftTypeUpdateWithWhereUniqueWithoutAircraftTypeInput[];
    updateMany?: Prisma.flightAircraftTypeUpdateManyWithWhereWithoutAircraftTypeInput | Prisma.flightAircraftTypeUpdateManyWithWhereWithoutAircraftTypeInput[];
    deleteMany?: Prisma.flightAircraftTypeScalarWhereInput | Prisma.flightAircraftTypeScalarWhereInput[];
};
export type flightAircraftTypeCreateNestedManyWithoutFlightInput = {
    create?: Prisma.XOR<Prisma.flightAircraftTypeCreateWithoutFlightInput, Prisma.flightAircraftTypeUncheckedCreateWithoutFlightInput> | Prisma.flightAircraftTypeCreateWithoutFlightInput[] | Prisma.flightAircraftTypeUncheckedCreateWithoutFlightInput[];
    connectOrCreate?: Prisma.flightAircraftTypeCreateOrConnectWithoutFlightInput | Prisma.flightAircraftTypeCreateOrConnectWithoutFlightInput[];
    createMany?: Prisma.flightAircraftTypeCreateManyFlightInputEnvelope;
    connect?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
};
export type flightAircraftTypeUncheckedCreateNestedManyWithoutFlightInput = {
    create?: Prisma.XOR<Prisma.flightAircraftTypeCreateWithoutFlightInput, Prisma.flightAircraftTypeUncheckedCreateWithoutFlightInput> | Prisma.flightAircraftTypeCreateWithoutFlightInput[] | Prisma.flightAircraftTypeUncheckedCreateWithoutFlightInput[];
    connectOrCreate?: Prisma.flightAircraftTypeCreateOrConnectWithoutFlightInput | Prisma.flightAircraftTypeCreateOrConnectWithoutFlightInput[];
    createMany?: Prisma.flightAircraftTypeCreateManyFlightInputEnvelope;
    connect?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
};
export type flightAircraftTypeUpdateManyWithoutFlightNestedInput = {
    create?: Prisma.XOR<Prisma.flightAircraftTypeCreateWithoutFlightInput, Prisma.flightAircraftTypeUncheckedCreateWithoutFlightInput> | Prisma.flightAircraftTypeCreateWithoutFlightInput[] | Prisma.flightAircraftTypeUncheckedCreateWithoutFlightInput[];
    connectOrCreate?: Prisma.flightAircraftTypeCreateOrConnectWithoutFlightInput | Prisma.flightAircraftTypeCreateOrConnectWithoutFlightInput[];
    upsert?: Prisma.flightAircraftTypeUpsertWithWhereUniqueWithoutFlightInput | Prisma.flightAircraftTypeUpsertWithWhereUniqueWithoutFlightInput[];
    createMany?: Prisma.flightAircraftTypeCreateManyFlightInputEnvelope;
    set?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    disconnect?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    delete?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    connect?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    update?: Prisma.flightAircraftTypeUpdateWithWhereUniqueWithoutFlightInput | Prisma.flightAircraftTypeUpdateWithWhereUniqueWithoutFlightInput[];
    updateMany?: Prisma.flightAircraftTypeUpdateManyWithWhereWithoutFlightInput | Prisma.flightAircraftTypeUpdateManyWithWhereWithoutFlightInput[];
    deleteMany?: Prisma.flightAircraftTypeScalarWhereInput | Prisma.flightAircraftTypeScalarWhereInput[];
};
export type flightAircraftTypeUncheckedUpdateManyWithoutFlightNestedInput = {
    create?: Prisma.XOR<Prisma.flightAircraftTypeCreateWithoutFlightInput, Prisma.flightAircraftTypeUncheckedCreateWithoutFlightInput> | Prisma.flightAircraftTypeCreateWithoutFlightInput[] | Prisma.flightAircraftTypeUncheckedCreateWithoutFlightInput[];
    connectOrCreate?: Prisma.flightAircraftTypeCreateOrConnectWithoutFlightInput | Prisma.flightAircraftTypeCreateOrConnectWithoutFlightInput[];
    upsert?: Prisma.flightAircraftTypeUpsertWithWhereUniqueWithoutFlightInput | Prisma.flightAircraftTypeUpsertWithWhereUniqueWithoutFlightInput[];
    createMany?: Prisma.flightAircraftTypeCreateManyFlightInputEnvelope;
    set?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    disconnect?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    delete?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    connect?: Prisma.flightAircraftTypeWhereUniqueInput | Prisma.flightAircraftTypeWhereUniqueInput[];
    update?: Prisma.flightAircraftTypeUpdateWithWhereUniqueWithoutFlightInput | Prisma.flightAircraftTypeUpdateWithWhereUniqueWithoutFlightInput[];
    updateMany?: Prisma.flightAircraftTypeUpdateManyWithWhereWithoutFlightInput | Prisma.flightAircraftTypeUpdateManyWithWhereWithoutFlightInput[];
    deleteMany?: Prisma.flightAircraftTypeScalarWhereInput | Prisma.flightAircraftTypeScalarWhereInput[];
};
export type flightAircraftTypeCreateWithoutAircraftTypeInput = {
    id?: string;
    flight: Prisma.flightCreateNestedOneWithoutFlightAircraftTypeInput;
};
export type flightAircraftTypeUncheckedCreateWithoutAircraftTypeInput = {
    id?: string;
    flightId: string;
};
export type flightAircraftTypeCreateOrConnectWithoutAircraftTypeInput = {
    where: Prisma.flightAircraftTypeWhereUniqueInput;
    create: Prisma.XOR<Prisma.flightAircraftTypeCreateWithoutAircraftTypeInput, Prisma.flightAircraftTypeUncheckedCreateWithoutAircraftTypeInput>;
};
export type flightAircraftTypeCreateManyAircraftTypeInputEnvelope = {
    data: Prisma.flightAircraftTypeCreateManyAircraftTypeInput | Prisma.flightAircraftTypeCreateManyAircraftTypeInput[];
};
export type flightAircraftTypeUpsertWithWhereUniqueWithoutAircraftTypeInput = {
    where: Prisma.flightAircraftTypeWhereUniqueInput;
    update: Prisma.XOR<Prisma.flightAircraftTypeUpdateWithoutAircraftTypeInput, Prisma.flightAircraftTypeUncheckedUpdateWithoutAircraftTypeInput>;
    create: Prisma.XOR<Prisma.flightAircraftTypeCreateWithoutAircraftTypeInput, Prisma.flightAircraftTypeUncheckedCreateWithoutAircraftTypeInput>;
};
export type flightAircraftTypeUpdateWithWhereUniqueWithoutAircraftTypeInput = {
    where: Prisma.flightAircraftTypeWhereUniqueInput;
    data: Prisma.XOR<Prisma.flightAircraftTypeUpdateWithoutAircraftTypeInput, Prisma.flightAircraftTypeUncheckedUpdateWithoutAircraftTypeInput>;
};
export type flightAircraftTypeUpdateManyWithWhereWithoutAircraftTypeInput = {
    where: Prisma.flightAircraftTypeScalarWhereInput;
    data: Prisma.XOR<Prisma.flightAircraftTypeUpdateManyMutationInput, Prisma.flightAircraftTypeUncheckedUpdateManyWithoutAircraftTypeInput>;
};
export type flightAircraftTypeScalarWhereInput = {
    AND?: Prisma.flightAircraftTypeScalarWhereInput | Prisma.flightAircraftTypeScalarWhereInput[];
    OR?: Prisma.flightAircraftTypeScalarWhereInput[];
    NOT?: Prisma.flightAircraftTypeScalarWhereInput | Prisma.flightAircraftTypeScalarWhereInput[];
    id?: Prisma.StringFilter<"flightAircraftType"> | string;
    flightId?: Prisma.StringFilter<"flightAircraftType"> | string;
    aircraftTypeId?: Prisma.StringFilter<"flightAircraftType"> | string;
};
export type flightAircraftTypeCreateWithoutFlightInput = {
    id?: string;
    aircraftType: Prisma.aircraftTypeCreateNestedOneWithoutFlightAircraftTypeInput;
};
export type flightAircraftTypeUncheckedCreateWithoutFlightInput = {
    id?: string;
    aircraftTypeId: string;
};
export type flightAircraftTypeCreateOrConnectWithoutFlightInput = {
    where: Prisma.flightAircraftTypeWhereUniqueInput;
    create: Prisma.XOR<Prisma.flightAircraftTypeCreateWithoutFlightInput, Prisma.flightAircraftTypeUncheckedCreateWithoutFlightInput>;
};
export type flightAircraftTypeCreateManyFlightInputEnvelope = {
    data: Prisma.flightAircraftTypeCreateManyFlightInput | Prisma.flightAircraftTypeCreateManyFlightInput[];
};
export type flightAircraftTypeUpsertWithWhereUniqueWithoutFlightInput = {
    where: Prisma.flightAircraftTypeWhereUniqueInput;
    update: Prisma.XOR<Prisma.flightAircraftTypeUpdateWithoutFlightInput, Prisma.flightAircraftTypeUncheckedUpdateWithoutFlightInput>;
    create: Prisma.XOR<Prisma.flightAircraftTypeCreateWithoutFlightInput, Prisma.flightAircraftTypeUncheckedCreateWithoutFlightInput>;
};
export type flightAircraftTypeUpdateWithWhereUniqueWithoutFlightInput = {
    where: Prisma.flightAircraftTypeWhereUniqueInput;
    data: Prisma.XOR<Prisma.flightAircraftTypeUpdateWithoutFlightInput, Prisma.flightAircraftTypeUncheckedUpdateWithoutFlightInput>;
};
export type flightAircraftTypeUpdateManyWithWhereWithoutFlightInput = {
    where: Prisma.flightAircraftTypeScalarWhereInput;
    data: Prisma.XOR<Prisma.flightAircraftTypeUpdateManyMutationInput, Prisma.flightAircraftTypeUncheckedUpdateManyWithoutFlightInput>;
};
export type flightAircraftTypeCreateManyAircraftTypeInput = {
    id?: string;
    flightId: string;
};
export type flightAircraftTypeUpdateWithoutAircraftTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flight?: Prisma.flightUpdateOneRequiredWithoutFlightAircraftTypeNestedInput;
};
export type flightAircraftTypeUncheckedUpdateWithoutAircraftTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flightId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type flightAircraftTypeUncheckedUpdateManyWithoutAircraftTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    flightId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type flightAircraftTypeCreateManyFlightInput = {
    id?: string;
    aircraftTypeId: string;
};
export type flightAircraftTypeUpdateWithoutFlightInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    aircraftType?: Prisma.aircraftTypeUpdateOneRequiredWithoutFlightAircraftTypeNestedInput;
};
export type flightAircraftTypeUncheckedUpdateWithoutFlightInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    aircraftTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type flightAircraftTypeUncheckedUpdateManyWithoutFlightInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    aircraftTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type flightAircraftTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flightId?: boolean;
    aircraftTypeId?: boolean;
    flight?: boolean | Prisma.flightDefaultArgs<ExtArgs>;
    aircraftType?: boolean | Prisma.aircraftTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flightAircraftType"]>;
export type flightAircraftTypeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flightId?: boolean;
    aircraftTypeId?: boolean;
    flight?: boolean | Prisma.flightDefaultArgs<ExtArgs>;
    aircraftType?: boolean | Prisma.aircraftTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flightAircraftType"]>;
export type flightAircraftTypeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    flightId?: boolean;
    aircraftTypeId?: boolean;
    flight?: boolean | Prisma.flightDefaultArgs<ExtArgs>;
    aircraftType?: boolean | Prisma.aircraftTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["flightAircraftType"]>;
export type flightAircraftTypeSelectScalar = {
    id?: boolean;
    flightId?: boolean;
    aircraftTypeId?: boolean;
};
export type flightAircraftTypeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "flightId" | "aircraftTypeId", ExtArgs["result"]["flightAircraftType"]>;
export type flightAircraftTypeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    flight?: boolean | Prisma.flightDefaultArgs<ExtArgs>;
    aircraftType?: boolean | Prisma.aircraftTypeDefaultArgs<ExtArgs>;
};
export type flightAircraftTypeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    flight?: boolean | Prisma.flightDefaultArgs<ExtArgs>;
    aircraftType?: boolean | Prisma.aircraftTypeDefaultArgs<ExtArgs>;
};
export type flightAircraftTypeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    flight?: boolean | Prisma.flightDefaultArgs<ExtArgs>;
    aircraftType?: boolean | Prisma.aircraftTypeDefaultArgs<ExtArgs>;
};
export type $flightAircraftTypePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "flightAircraftType";
    objects: {
        flight: Prisma.$flightPayload<ExtArgs>;
        aircraftType: Prisma.$aircraftTypePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        flightId: string;
        aircraftTypeId: string;
    }, ExtArgs["result"]["flightAircraftType"]>;
    composites: {};
};
export type flightAircraftTypeGetPayload<S extends boolean | null | undefined | flightAircraftTypeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload, S>;
export type flightAircraftTypeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<flightAircraftTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FlightAircraftTypeCountAggregateInputType | true;
};
export interface flightAircraftTypeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['flightAircraftType'];
        meta: {
            name: 'flightAircraftType';
        };
    };
    /**
     * Find zero or one FlightAircraftType that matches the filter.
     * @param {flightAircraftTypeFindUniqueArgs} args - Arguments to find a FlightAircraftType
     * @example
     * // Get one FlightAircraftType
     * const flightAircraftType = await prisma.flightAircraftType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends flightAircraftTypeFindUniqueArgs>(args: Prisma.SelectSubset<T, flightAircraftTypeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__flightAircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FlightAircraftType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {flightAircraftTypeFindUniqueOrThrowArgs} args - Arguments to find a FlightAircraftType
     * @example
     * // Get one FlightAircraftType
     * const flightAircraftType = await prisma.flightAircraftType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends flightAircraftTypeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, flightAircraftTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__flightAircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FlightAircraftType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {flightAircraftTypeFindFirstArgs} args - Arguments to find a FlightAircraftType
     * @example
     * // Get one FlightAircraftType
     * const flightAircraftType = await prisma.flightAircraftType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends flightAircraftTypeFindFirstArgs>(args?: Prisma.SelectSubset<T, flightAircraftTypeFindFirstArgs<ExtArgs>>): Prisma.Prisma__flightAircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FlightAircraftType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {flightAircraftTypeFindFirstOrThrowArgs} args - Arguments to find a FlightAircraftType
     * @example
     * // Get one FlightAircraftType
     * const flightAircraftType = await prisma.flightAircraftType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends flightAircraftTypeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, flightAircraftTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__flightAircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FlightAircraftTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {flightAircraftTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FlightAircraftTypes
     * const flightAircraftTypes = await prisma.flightAircraftType.findMany()
     *
     * // Get first 10 FlightAircraftTypes
     * const flightAircraftTypes = await prisma.flightAircraftType.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const flightAircraftTypeWithIdOnly = await prisma.flightAircraftType.findMany({ select: { id: true } })
     *
     */
    findMany<T extends flightAircraftTypeFindManyArgs>(args?: Prisma.SelectSubset<T, flightAircraftTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FlightAircraftType.
     * @param {flightAircraftTypeCreateArgs} args - Arguments to create a FlightAircraftType.
     * @example
     * // Create one FlightAircraftType
     * const FlightAircraftType = await prisma.flightAircraftType.create({
     *   data: {
     *     // ... data to create a FlightAircraftType
     *   }
     * })
     *
     */
    create<T extends flightAircraftTypeCreateArgs>(args: Prisma.SelectSubset<T, flightAircraftTypeCreateArgs<ExtArgs>>): Prisma.Prisma__flightAircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FlightAircraftTypes.
     * @param {flightAircraftTypeCreateManyArgs} args - Arguments to create many FlightAircraftTypes.
     * @example
     * // Create many FlightAircraftTypes
     * const flightAircraftType = await prisma.flightAircraftType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends flightAircraftTypeCreateManyArgs>(args?: Prisma.SelectSubset<T, flightAircraftTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FlightAircraftTypes and returns the data saved in the database.
     * @param {flightAircraftTypeCreateManyAndReturnArgs} args - Arguments to create many FlightAircraftTypes.
     * @example
     * // Create many FlightAircraftTypes
     * const flightAircraftType = await prisma.flightAircraftType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FlightAircraftTypes and only return the `id`
     * const flightAircraftTypeWithIdOnly = await prisma.flightAircraftType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends flightAircraftTypeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, flightAircraftTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FlightAircraftType.
     * @param {flightAircraftTypeDeleteArgs} args - Arguments to delete one FlightAircraftType.
     * @example
     * // Delete one FlightAircraftType
     * const FlightAircraftType = await prisma.flightAircraftType.delete({
     *   where: {
     *     // ... filter to delete one FlightAircraftType
     *   }
     * })
     *
     */
    delete<T extends flightAircraftTypeDeleteArgs>(args: Prisma.SelectSubset<T, flightAircraftTypeDeleteArgs<ExtArgs>>): Prisma.Prisma__flightAircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FlightAircraftType.
     * @param {flightAircraftTypeUpdateArgs} args - Arguments to update one FlightAircraftType.
     * @example
     * // Update one FlightAircraftType
     * const flightAircraftType = await prisma.flightAircraftType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends flightAircraftTypeUpdateArgs>(args: Prisma.SelectSubset<T, flightAircraftTypeUpdateArgs<ExtArgs>>): Prisma.Prisma__flightAircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FlightAircraftTypes.
     * @param {flightAircraftTypeDeleteManyArgs} args - Arguments to filter FlightAircraftTypes to delete.
     * @example
     * // Delete a few FlightAircraftTypes
     * const { count } = await prisma.flightAircraftType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends flightAircraftTypeDeleteManyArgs>(args?: Prisma.SelectSubset<T, flightAircraftTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FlightAircraftTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {flightAircraftTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FlightAircraftTypes
     * const flightAircraftType = await prisma.flightAircraftType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends flightAircraftTypeUpdateManyArgs>(args: Prisma.SelectSubset<T, flightAircraftTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FlightAircraftTypes and returns the data updated in the database.
     * @param {flightAircraftTypeUpdateManyAndReturnArgs} args - Arguments to update many FlightAircraftTypes.
     * @example
     * // Update many FlightAircraftTypes
     * const flightAircraftType = await prisma.flightAircraftType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FlightAircraftTypes and only return the `id`
     * const flightAircraftTypeWithIdOnly = await prisma.flightAircraftType.updateManyAndReturn({
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
    updateManyAndReturn<T extends flightAircraftTypeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, flightAircraftTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FlightAircraftType.
     * @param {flightAircraftTypeUpsertArgs} args - Arguments to update or create a FlightAircraftType.
     * @example
     * // Update or create a FlightAircraftType
     * const flightAircraftType = await prisma.flightAircraftType.upsert({
     *   create: {
     *     // ... data to create a FlightAircraftType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FlightAircraftType we want to update
     *   }
     * })
     */
    upsert<T extends flightAircraftTypeUpsertArgs>(args: Prisma.SelectSubset<T, flightAircraftTypeUpsertArgs<ExtArgs>>): Prisma.Prisma__flightAircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$flightAircraftTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FlightAircraftTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {flightAircraftTypeCountArgs} args - Arguments to filter FlightAircraftTypes to count.
     * @example
     * // Count the number of FlightAircraftTypes
     * const count = await prisma.flightAircraftType.count({
     *   where: {
     *     // ... the filter for the FlightAircraftTypes we want to count
     *   }
     * })
    **/
    count<T extends flightAircraftTypeCountArgs>(args?: Prisma.Subset<T, flightAircraftTypeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FlightAircraftTypeCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FlightAircraftType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FlightAircraftTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FlightAircraftTypeAggregateArgs>(args: Prisma.Subset<T, FlightAircraftTypeAggregateArgs>): Prisma.PrismaPromise<GetFlightAircraftTypeAggregateType<T>>;
    /**
     * Group by FlightAircraftType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {flightAircraftTypeGroupByArgs} args - Group by arguments.
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
    groupBy<T extends flightAircraftTypeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: flightAircraftTypeGroupByArgs['orderBy'];
    } : {
        orderBy?: flightAircraftTypeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, flightAircraftTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFlightAircraftTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the flightAircraftType model
     */
    readonly fields: flightAircraftTypeFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for flightAircraftType.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__flightAircraftTypeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    flight<T extends Prisma.flightDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.flightDefaultArgs<ExtArgs>>): Prisma.Prisma__flightClient<runtime.Types.Result.GetResult<Prisma.$flightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    aircraftType<T extends Prisma.aircraftTypeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.aircraftTypeDefaultArgs<ExtArgs>>): Prisma.Prisma__aircraftTypeClient<runtime.Types.Result.GetResult<Prisma.$aircraftTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the flightAircraftType model
 */
export interface flightAircraftTypeFieldRefs {
    readonly id: Prisma.FieldRef<"flightAircraftType", 'String'>;
    readonly flightId: Prisma.FieldRef<"flightAircraftType", 'String'>;
    readonly aircraftTypeId: Prisma.FieldRef<"flightAircraftType", 'String'>;
}
/**
 * flightAircraftType findUnique
 */
export type flightAircraftTypeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which flightAircraftType to fetch.
     */
    where: Prisma.flightAircraftTypeWhereUniqueInput;
};
/**
 * flightAircraftType findUniqueOrThrow
 */
export type flightAircraftTypeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which flightAircraftType to fetch.
     */
    where: Prisma.flightAircraftTypeWhereUniqueInput;
};
/**
 * flightAircraftType findFirst
 */
export type flightAircraftTypeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which flightAircraftType to fetch.
     */
    where?: Prisma.flightAircraftTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of flightAircraftTypes to fetch.
     */
    orderBy?: Prisma.flightAircraftTypeOrderByWithRelationInput | Prisma.flightAircraftTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for flightAircraftTypes.
     */
    cursor?: Prisma.flightAircraftTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` flightAircraftTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` flightAircraftTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of flightAircraftTypes.
     */
    distinct?: Prisma.FlightAircraftTypeScalarFieldEnum | Prisma.FlightAircraftTypeScalarFieldEnum[];
};
/**
 * flightAircraftType findFirstOrThrow
 */
export type flightAircraftTypeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which flightAircraftType to fetch.
     */
    where?: Prisma.flightAircraftTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of flightAircraftTypes to fetch.
     */
    orderBy?: Prisma.flightAircraftTypeOrderByWithRelationInput | Prisma.flightAircraftTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for flightAircraftTypes.
     */
    cursor?: Prisma.flightAircraftTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` flightAircraftTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` flightAircraftTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of flightAircraftTypes.
     */
    distinct?: Prisma.FlightAircraftTypeScalarFieldEnum | Prisma.FlightAircraftTypeScalarFieldEnum[];
};
/**
 * flightAircraftType findMany
 */
export type flightAircraftTypeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which flightAircraftTypes to fetch.
     */
    where?: Prisma.flightAircraftTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of flightAircraftTypes to fetch.
     */
    orderBy?: Prisma.flightAircraftTypeOrderByWithRelationInput | Prisma.flightAircraftTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing flightAircraftTypes.
     */
    cursor?: Prisma.flightAircraftTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` flightAircraftTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` flightAircraftTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of flightAircraftTypes.
     */
    distinct?: Prisma.FlightAircraftTypeScalarFieldEnum | Prisma.FlightAircraftTypeScalarFieldEnum[];
};
/**
 * flightAircraftType create
 */
export type flightAircraftTypeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a flightAircraftType.
     */
    data: Prisma.XOR<Prisma.flightAircraftTypeCreateInput, Prisma.flightAircraftTypeUncheckedCreateInput>;
};
/**
 * flightAircraftType createMany
 */
export type flightAircraftTypeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many flightAircraftTypes.
     */
    data: Prisma.flightAircraftTypeCreateManyInput | Prisma.flightAircraftTypeCreateManyInput[];
};
/**
 * flightAircraftType createManyAndReturn
 */
export type flightAircraftTypeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the flightAircraftType
     */
    select?: Prisma.flightAircraftTypeSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the flightAircraftType
     */
    omit?: Prisma.flightAircraftTypeOmit<ExtArgs> | null;
    /**
     * The data used to create many flightAircraftTypes.
     */
    data: Prisma.flightAircraftTypeCreateManyInput | Prisma.flightAircraftTypeCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.flightAircraftTypeIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * flightAircraftType update
 */
export type flightAircraftTypeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a flightAircraftType.
     */
    data: Prisma.XOR<Prisma.flightAircraftTypeUpdateInput, Prisma.flightAircraftTypeUncheckedUpdateInput>;
    /**
     * Choose, which flightAircraftType to update.
     */
    where: Prisma.flightAircraftTypeWhereUniqueInput;
};
/**
 * flightAircraftType updateMany
 */
export type flightAircraftTypeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update flightAircraftTypes.
     */
    data: Prisma.XOR<Prisma.flightAircraftTypeUpdateManyMutationInput, Prisma.flightAircraftTypeUncheckedUpdateManyInput>;
    /**
     * Filter which flightAircraftTypes to update
     */
    where?: Prisma.flightAircraftTypeWhereInput;
    /**
     * Limit how many flightAircraftTypes to update.
     */
    limit?: number;
};
/**
 * flightAircraftType updateManyAndReturn
 */
export type flightAircraftTypeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the flightAircraftType
     */
    select?: Prisma.flightAircraftTypeSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the flightAircraftType
     */
    omit?: Prisma.flightAircraftTypeOmit<ExtArgs> | null;
    /**
     * The data used to update flightAircraftTypes.
     */
    data: Prisma.XOR<Prisma.flightAircraftTypeUpdateManyMutationInput, Prisma.flightAircraftTypeUncheckedUpdateManyInput>;
    /**
     * Filter which flightAircraftTypes to update
     */
    where?: Prisma.flightAircraftTypeWhereInput;
    /**
     * Limit how many flightAircraftTypes to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.flightAircraftTypeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * flightAircraftType upsert
 */
export type flightAircraftTypeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the flightAircraftType to update in case it exists.
     */
    where: Prisma.flightAircraftTypeWhereUniqueInput;
    /**
     * In case the flightAircraftType found by the `where` argument doesn't exist, create a new flightAircraftType with this data.
     */
    create: Prisma.XOR<Prisma.flightAircraftTypeCreateInput, Prisma.flightAircraftTypeUncheckedCreateInput>;
    /**
     * In case the flightAircraftType was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.flightAircraftTypeUpdateInput, Prisma.flightAircraftTypeUncheckedUpdateInput>;
};
/**
 * flightAircraftType delete
 */
export type flightAircraftTypeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which flightAircraftType to delete.
     */
    where: Prisma.flightAircraftTypeWhereUniqueInput;
};
/**
 * flightAircraftType deleteMany
 */
export type flightAircraftTypeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which flightAircraftTypes to delete
     */
    where?: Prisma.flightAircraftTypeWhereInput;
    /**
     * Limit how many flightAircraftTypes to delete.
     */
    limit?: number;
};
/**
 * flightAircraftType without action
 */
export type flightAircraftTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
